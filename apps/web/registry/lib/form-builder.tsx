import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import {
  make,
  useAtom,
  useAtomSet,
  useAtomSubscribe,
  useAtomValue,
} from '@effect/atom-react'
import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'
import * as SchemaIssue from 'effect/SchemaIssue'
import * as Atom from 'effect/unstable/reactivity/Atom'
import * as React from 'react'

type Issues = {
  path?: readonly unknown[]
  message: string
}[]

interface FormState<TValues> {
  values: TValues
  errors: Record<keyof TValues, Issues>
  isPending: boolean
}

export class FormBuilder<TFields extends Schema.Struct.Fields> {
  private formatter = SchemaIssue.makeFormatterStandardSchemaV1()

  private constructor(
    private fields: TFields,
    private refinements: {
      refinement: (data: Schema.Struct<TFields>['Type']) => boolean
      options: { path: (keyof TFields)[]; message: string }
    }[]
  ) {}

  public static get empty() {
    return new FormBuilder({}, [])
  }

  public add<TFieldName extends string, TFieldSchema extends Schema.Constraint>(
    name: TFieldName,
    schema: TFieldSchema
  ): FormBuilder<TFields & Record<TFieldName, TFieldSchema>> {
    this.fields = { ...this.fields, [name]: schema }
    return this as unknown as FormBuilder<
      TFields & Record<TFieldName, TFieldSchema>
    >
  }

  public refine(
    refinement: (data: Schema.Struct<TFields>['Type']) => boolean,
    options: { path: (keyof TFields)[]; message: string }
  ): FormBuilder<TFields> {
    this.refinements.push({ refinement, options })
    return this
  }

  public make<TValues extends Schema.Struct<TFields>['Type'], A, E>(
    onSubmit: (values: NoInfer<TValues>) => Effect.Effect<A, E>,
    options: {
      defaultValues: TValues
      onSuccess?: (data: NoInfer<A>) => void
      onError?: (error: NoInfer<E>) => void
    }
  ) {
    const keys = Object.keys(options.defaultValues) as (keyof TValues)[]

    const valuesAtoms = Atom.family((fieldName: keyof TValues) =>
      Atom.make(options.defaultValues[fieldName])
    )

    const errorsAtoms = Atom.family((_fieldName: keyof TValues) =>
      Atom.make([] as Issues)
    )

    const pendingAtom = Atom.make(false)

    const formAtom = make(() =>
      Atom.writable(
        (get) => {
          const values = {} as TValues
          const errors = {} as Record<keyof TValues, Issues>
          const isPending = get(pendingAtom)

          for (const key of keys) {
            values[key] = get(valuesAtoms(key))
            errors[key] = get(errorsAtoms(key))
          }

          return { values, errors, isPending }
        },
        (ctx, newState: FormState<TValues>) => {
          for (const key of keys) {
            const oldVal = ctx.get(valuesAtoms(key))
            const newVal = newState.values[key]
            if (oldVal !== newVal) ctx.set(valuesAtoms(key), newVal)

            const oldErr = ctx.get(errorsAtoms(key))
            const newErr = newState.errors[key] || []
            if (oldErr !== newErr) ctx.set(errorsAtoms(key), newErr)
          }

          if (ctx.get(pendingAtom) !== newState.isPending)
            ctx.set(pendingAtom, newState.isPending)
        }
      )
    )

    let formSchema = Schema.Struct(this.fields)
    for (const { refinement, options: opts } of this.refinements)
      formSchema = formSchema.check(
        Schema.makeFilter((data) =>
          refinement(data)
            ? undefined
            : { path: opts.path, issue: opts.message }
        )
      )

    const FormContext = React.createContext<{
      formId: string
    } | null>(null)

    const useSubmit = () => {
      const form = formAtom.use()
      const valuesRef = React.useRef<TValues>(options.defaultValues)
      const isPending = useAtomValue(form, (s) => s.isPending)
      const setState = useAtomSet(form)

      useAtomSubscribe(
        form,
        (latestValues) => (valuesRef.current = latestValues.values),
        { immediate: true }
      )

      return React.useCallback(async () => {
        if (isPending) return
        setState((prev) => ({ ...prev, isPending: true }))

        const result = Schema.decodeUnknownResult(formSchema as never)(
          valuesRef.current,
          { errors: 'all' }
        )

        if (result._tag === 'Failure') {
          const { issues } = this.formatter(result.failure.issue)
          const errors = {} as Record<keyof TValues, Issues>
          for (const issue of issues) {
            const path = issue.path?.[0] as keyof TValues
            if (!errors[path]) errors[path] = []
            errors[path].push(issue)
          }

          return setState((prev) => ({ ...prev, errors, isPending: false }))
        }

        setState((prev) => ({
          ...prev,
          errors: {} as Record<keyof TValues, Issues>,
        }))

        await onSubmit(result.success).pipe(
          Effect.tap((a) => Effect.sync(() => options.onSuccess?.(a))),
          Effect.catch((error) => Effect.sync(() => options.onError?.(error))),
          Effect.runPromise
        )

        setState((prev) => ({ ...prev, isPending: false }))
      }, [setState, isPending])
    }

    const Form: React.FC<
      Omit<useRender.ComponentProps<'form'>, 'render'> & {
        render: (args: {
          handleSubmit: () => void
        }) => useRender.ComponentProps<'form'>['render']
      }
    > = ({ render, ...props }) => {
      const id = React.useId()
      const formId = `form-${id}`
      const submit = useSubmit()

      return (
        <FormContext value={{ formId }}>
          {useRender({
            defaultTagName: 'form',
            props: mergeProps<'form'>({ id: formId }, props),
            render: render({ handleSubmit: submit }),
            state: { slot: 'form' },
          })}
        </FormContext>
      )
    }

    const Field = <TFieldName extends keyof TValues>(props: {
      name: TFieldName
      render: (args: {
        field: {
          id: string
          name: TFieldName
          value: TValues[TFieldName]
          onChange: (value: TValues[TFieldName]) => void
          onBlur: () => void
        }
        meta: {
          descriptionId: string
          errorId: string
          errors: Issues
          add: TValues[TFieldName] extends (infer U)[]
            ? (value: U) => void
            : never
          update: TValues[TFieldName] extends (infer U)[]
            ? (index: number, value: U) => void
            : never
          remove: TValues[TFieldName] extends (infer _U)[]
            ? (index: number) => void
            : never
        }
      }) => React.ReactNode
    }) => {
      const ctx = React.use(FormContext)
      if (!ctx) throw new Error('Field must be used within a Form')

      const prevValueRef = React.useRef<TValues[TFieldName]>(
        options.defaultValues[props.name]
      )

      const [value, setValue] = useAtom(valuesAtoms(props.name))
      const [errors, setErrors] = useAtom(errorsAtoms(props.name))

      const handleChange = React.useCallback(
        (newValue: TValues[TFieldName]) => setValue(newValue),
        [setValue]
      )

      const handleBlur = React.useCallback(() => {
        if (prevValueRef.current === value) return
        prevValueRef.current = value as TValues[TFieldName]

        const result = Schema.decodeUnknownResult(
          this.fields[props.name] as never
        )(value)

        if (result._tag === 'Failure') {
          const { issues } = this.formatter(result.failure.issue)
          setErrors(issues as never)
        } else setErrors([])
      }, [props.name, setErrors, value])

      const add = React.useCallback(
        (newValue: TValues[TFieldName] extends (infer U)[] ? U : never) => {
          setValue((prev) =>
            Array.isArray(prev)
              ? ([...(prev as unknown[]), newValue] as never)
              : prev
          )
        },
        [setValue]
      )

      const update = React.useCallback(
        (
          index: number,
          newValue: TValues[TFieldName] extends (infer U)[] ? U : never
        ) => {
          setValue((prev) =>
            Array.isArray(prev)
              ? ((prev as unknown[]).map((v, i) =>
                  i === index ? newValue : v
                ) as never)
              : prev
          )
        },
        [setValue]
      )

      const remove = React.useCallback(
        (index: number) => {
          setValue((prev) =>
            Array.isArray(prev)
              ? ((prev as unknown[]).filter((_, i) => i !== index) as never)
              : prev
          )
        },
        [setValue]
      )

      const fieldId = `${ctx.formId}-field-${props.name.toString()}`
      const descriptionId = `${fieldId}-description`
      const errorId = `${fieldId}-error`

      const a11yProps = {
        'data-slot': 'form-field',
        form: ctx.formId,
        id: fieldId,
        'aria-describedby':
          errors.length > 0 ? `${errorId} ${descriptionId}` : descriptionId,
        'aria-invalid': errors.length > 0,
      }

      return props.render({
        field: {
          name: props.name,
          value: value as TValues[TFieldName],
          onChange: handleChange,
          onBlur: handleBlur,
          ...a11yProps,
        },
        meta: {
          descriptionId,
          errorId,
          errors,
          add: add as never,
          update: update as never,
          remove: remove as never,
        },
      })
    }

    const Submit = (props: {
      render: (args: {
        submit: () => void
        meta: { formId: string; isPending: boolean }
      }) => React.ReactNode
    }) => {
      const ctx = React.use(FormContext)
      if (!ctx) throw new Error('Submit must be used within a Form')

      const isPending = useAtomValue(formAtom.use(), (s) => s.isPending)
      const submit = useSubmit()

      return props.render({
        submit,
        meta: { formId: ctx.formId, isPending },
      })
    }

    return {
      Root: (props: React.ComponentProps<typeof Form>) => (
        <formAtom.Provider>
          <Form {...props} />
        </formAtom.Provider>
      ),

      Field,

      Submit,

      state: formAtom.use,
    }
  }
}
