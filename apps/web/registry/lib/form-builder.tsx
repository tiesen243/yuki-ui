// oxlint-disable react/no-this-in-sfc

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

import { useIsomorphicLayoutEffect } from '@/registry/hooks/use-isomorphic-layout-effect'

export class FormBuilder<TFields extends Schema.Struct.Fields> {
  private formatter = SchemaIssue.makeFormatterStandardSchemaV1()

  private fields: TFields = {} as TFields

  private refinements: {
    refinement: (data: Schema.Struct<TFields>['Type']) => boolean
    options: { path: (keyof TFields)[]; issue: string }
  }[] = []

  public static get empty() {
    return new FormBuilder()
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
    options: { path: (keyof TFields)[]; issue: string }
  ): FormBuilder<TFields> {
    this.refinements.push({ refinement, options })
    return this
  }

  public make<
    TValues extends Schema.Struct<TFields>['Type'] =
      Schema.Struct<TFields>['Type'],
  >() {
    const defaultValuesAtom = Atom.make({} as TValues)

    const valuesAtoms = Atom.family((_fieldName: keyof TValues) =>
      // oxlint-disable-next-line unicorn/no-useless-undefined typescript/no-explicit-any
      Atom.make<any>(undefined)
    )

    const errorsAtoms = Atom.family((_fieldName: keyof TValues) =>
      Atom.make([] as FormBuilder.Issues)
    )

    const pendingAtom = Atom.make(false)

    const formAtom = make(() =>
      Atom.writable(
        (get) => {
          const defaults = get(defaultValuesAtom)
          const keys = Object.keys(defaults) as (keyof TValues)[]
          const values = { ...defaults } as TValues
          const errors = {} as Record<keyof TValues, FormBuilder.Issues>
          const isPending = get(pendingAtom)

          for (const key of keys) {
            const val = get(valuesAtoms(key))
            if (val !== undefined) values[key] = val

            errors[key] = get(errorsAtoms(key))
          }

          return { values, errors, isPending }
        },
        (ctx, newState: FormBuilder.FormState<TValues>) => {
          const keys = Object.keys(newState.values) as (keyof TValues)[]
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
        Schema.makeFilter((data) => (refinement(data) ? undefined : opts))
      )

    const FormContext = React.createContext<{
      formId: string
      defaultValues: TValues
      handleSubmit: <A, E>(
        onSubmit: (values: TValues) => Effect.Effect<A, E>,
        options?: FormBuilder.SubmitOptions<A, E>
      ) => void
    } | null>(null)

    const useSubmit = () => {
      const form = formAtom.use()
      const valuesRef = React.useRef<TValues>({} as TValues)
      const isPending = useAtomValue(form, (s) => s.isPending)
      const setState = useAtomSet(form)

      useAtomSubscribe(
        form,
        (latestValues) => (valuesRef.current = latestValues.values),
        { immediate: true }
      )

      return React.useCallback(
        async <A, E>(
          onSubmit: (values: TValues) => Effect.Effect<A, E>,
          opts?: FormBuilder.SubmitOptions<A, E>
        ) => {
          if (isPending) return
          setState((prev) => ({ ...prev, isPending: true }))

          const result = Schema.decodeUnknownResult(formSchema as never)(
            valuesRef.current,
            { errors: 'all' }
          )

          if (result._tag === 'Failure') {
            const { issues } = this.formatter(result.failure.issue)
            const errors = {} as Record<keyof TValues, FormBuilder.Issues>
            for (const issue of issues) {
              const path = issue.path?.[0] as keyof TValues
              if (!errors[path]) errors[path] = []
              errors[path].push(issue)
            }

            return setState((prev) => ({ ...prev, errors, isPending: false }))
          }

          setState((prev) => ({
            ...prev,
            errors: {} as Record<keyof TValues, FormBuilder.Issues>,
          }))

          await onSubmit(result.success).pipe(
            Effect.tap((a) => Effect.sync(() => opts?.onSuccess?.(a))),
            Effect.catch((error) =>
              Effect.sync(() => opts?.onError?.(this.makeMatchableError(error)))
            ),
            Effect.runPromise
          )

          setState((prev) => ({ ...prev, isPending: false }))
        },
        [setState, isPending]
      )
    }

    const Form: React.FC<
      Omit<useRender.ComponentProps<'div'>, 'render'> & {
        defaultValues: TValues
        render: (args: {
          handleSubmit: <A, E>(
            onSubmit: (values: TValues) => Effect.Effect<A, E>,
            options?: FormBuilder.SubmitOptions<A, E>
          ) => void
          meta: { formId: string }
        }) => useRender.ComponentProps<'div'>['render']
      }
    > = ({ defaultValues, render, ...props }) => {
      const id = React.useId()
      const formId = `form-${id}`

      const setDefaultValues = useAtomSet(defaultValuesAtom)
      useIsomorphicLayoutEffect(
        () => setDefaultValues(defaultValues),
        [defaultValues, setDefaultValues]
      )

      const handleSubmit = useSubmit()

      const memoizedValue = React.useMemo(
        () => ({ formId, defaultValues, handleSubmit }),
        [formId, defaultValues, handleSubmit]
      )

      return (
        <FormContext value={memoizedValue}>
          {useRender({
            defaultTagName: 'div',
            props: mergeProps<'div'>({ id: formId }, props),
            render: render({ handleSubmit, meta: { formId } }),
            state: {
              slot: 'form',
            },
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
          errors: FormBuilder.Issues
          isPending: boolean

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
        ctx.defaultValues[props.name]
      )

      const [rawAtomValue, setValue] = useAtom(valuesAtoms(props.name))
      const value = (rawAtomValue ??
        ctx.defaultValues[props.name]) as TValues[TFieldName]

      const [errors, setErrors] = useAtom(errorsAtoms(props.name))
      const isPending = useAtomValue(formAtom.use(), (s) => s.isPending)

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
          setValue((prev: unknown[]) =>
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
        ) =>
          setValue((prev: unknown[]) =>
            Array.isArray(prev)
              ? ((prev as unknown[]).map((v, i) =>
                  i === index ? newValue : v
                ) as never)
              : prev
          ),
        [setValue]
      )

      const remove = React.useCallback(
        (index: number) =>
          setValue((prev: unknown[]) =>
            Array.isArray(prev)
              ? ((prev as unknown[]).filter((_, i) => i !== index) as never)
              : prev
          ),
        [setValue]
      )

      const fieldId = `${ctx.formId}-field-${props.name.toString()}`
      const descriptionId = `${fieldId}-description`
      const errorId = `${fieldId}-error`

      const a11yProps = React.useMemo(
        () => ({
          'data-slot': 'form-field',
          form: ctx.formId,
          id: fieldId,
          'aria-describedby':
            errors.length > 0 ? `${errorId} ${descriptionId}` : descriptionId,
          'aria-invalid': errors.length > 0,
        }),
        [descriptionId, errorId, errors.length, fieldId, ctx.formId]
      )

      const memoizedValue = React.useMemo(
        () => ({
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
            isPending,

            add: add as never,
            update: update as never,
            remove: remove as never,
          },
        }),
        [
          add,
          a11yProps,
          update,
          errorId,
          value,
          props.name,
          descriptionId,
          handleChange,
          handleBlur,
          remove,
          errors,
          isPending,
        ]
      )

      return props.render(memoizedValue)
    }

    const Submit = (props: {
      render: (args: {
        handleSubmit: <A, E>(
          onSubmit: (values: TValues) => Effect.Effect<A, E>,
          options?: FormBuilder.SubmitOptions<A, E>
        ) => void
        meta: { formId: string; isPending: boolean }
      }) => React.ReactNode
    }) => {
      const ctx = React.use(FormContext)
      if (!ctx) throw new Error('Submit must be used within a Form')

      const isPending = useAtomValue(formAtom.use(), (s) => s.isPending)

      const memoizedValue = React.useMemo(
        () => ({
          handleSubmit: ctx.handleSubmit,
          meta: { formId: ctx.formId, isPending },
        }),
        [ctx.formId, ctx.handleSubmit, isPending]
      )

      return props.render(memoizedValue)
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

  // oxlint-disable-next-line class-methods-use-this
  private makeMatchableError<E>(error: E): FormBuilder.MatchableError<E> {
    // oxlint-disable-next-line typescript/no-explicit-any
    const match = (cases: Record<string, (err: any) => void>) => {
      if (
        error &&
        typeof error === 'object' &&
        '_tag' in error &&
        typeof error._tag === 'string' &&
        cases[error._tag]
      )
        return cases[error._tag]?.(error)

      if (cases._) return cases._(error)
    }

    if (typeof error === 'object' && error !== null) {
      Object.defineProperty(error, 'match', {
        value: match,
        enumerable: false,
        writable: true,
        configurable: true,
      })
      return error as FormBuilder.MatchableError<E>
    }

    return {
      error,
      match,
    } as unknown as FormBuilder.MatchableError<E>
  }
}

export namespace FormBuilder {
  export type Issues = {
    path?: readonly unknown[]
    message: string
  }[]

  export interface FormState<TValues> {
    values: TValues
    errors: Record<keyof TValues, Issues>
    isPending: boolean
  }

  export type MatchableError<E> = E & {
    match: <
      Cases extends (E extends { _tag: string }
        ? { [K in E['_tag']]?: (error: Extract<E, { _tag: K }>) => void } & {
            _?: (error: E) => void
          }
        : { _?: (error: E) => void }),
    >(
      cases: Cases
    ) => void
  }

  export interface SubmitOptions<A, E> {
    onSuccess?: (data: NoInfer<A>) => void
    onError?: (error: MatchableError<NoInfer<E>>) => void
  }
}
