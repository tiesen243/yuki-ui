import type { StandardSchemaV1 } from 'effect/StandardSchema'

import {
  make,
  useAtomSet,
  useAtomSubscribe,
  useAtomValue,
} from '@effect/atom-react'
import * as Effect from 'effect/Effect'
import * as Match from 'effect/Match'
import * as Schema from 'effect/Schema'
import * as SchemaIssue from 'effect/SchemaIssue'
import * as Atom from 'effect/unstable/reactivity/Atom'
import * as React from 'react'

const EMPTY_ERRORS: readonly StandardSchemaV1.Issue[] = []

export class FormBuilder<
  TFields extends Record<string, Schema.ConstraintDecoder<unknown, never>>,
> {
  private _fields: TFields = {} as TFields
  private _refinements: FormBuilder.Refinement<TFields>[] = []
  private _formatter: SchemaIssue.Formatter<StandardSchemaV1.FailureResult>

  // oxlint-disable-next-line class-methods-use-this
  public make<TValues extends Schema.Struct<TFields>['Type']>() {
    // oxlint-disable-next-line typescript/no-this-alias unicorn/no-this-assignment
    const self = this

    const valuesAtom = Atom.family((_key: keyof TValues) =>
      Atom.make(undefined as TValues[keyof TValues])
    )

    const errorsAtom = Atom.family((_key: keyof TValues) =>
      Atom.make(EMPTY_ERRORS as StandardSchemaV1.Issue[])
    )

    const isPendingAtom = Atom.make(false)

    const formAtom = make((props: { formId: string; defaultValues: TValues }) =>
      Atom.writable(
        (get) => {
          const keys = Object.keys(props.defaultValues) as (keyof TValues)[]

          const values = { ...props.defaultValues }
          const errors = {} as Record<keyof TValues, StandardSchemaV1.Issue[]>

          for (const key of keys) {
            const val = get(valuesAtom(key))
            if (val !== undefined) values[key] = val

            const err = get(errorsAtom(key))
            if (err !== undefined) errors[key] = err
          }

          const isPending = get(isPendingAtom)

          return { formId: props.formId, values, errors, isPending }
        },
        (ctx, newState: FormBuilder.State<TValues>) => {
          const keys = Object.keys(newState.values) as (keyof TValues)[]

          for (const key of keys) {
            const oldVal = ctx.get(valuesAtom(key))
            const newVal = newState.values[key]
            if (oldVal !== newVal) ctx.set(valuesAtom(key), newVal)

            const oldErr = ctx.get(errorsAtom(key))
            const newErr = newState.errors[key]
            if (oldErr !== newErr) ctx.set(errorsAtom(key), newErr)

            const oldPending = ctx.get(isPendingAtom)
            const newPending = newState.isPending
            if (oldPending !== newPending) ctx.set(isPendingAtom, newPending)
          }
        }
      )
    )

    // oxlint-disable-next-line unicorn/consistent-function-scoping
    function Provider({
      defaultValues,
      children,
    }: Readonly<{
      defaultValues: TValues
      children: React.ReactNode
    }>) {
      const formId = React.useId()

      const memoizedValue = React.useMemo(
        () => ({ formId, defaultValues }),
        [formId, defaultValues]
      )

      return (
        <formAtom.Provider value={memoizedValue}>{children}</formAtom.Provider>
      )
    }

    function Field<
      TField extends keyof TValues,
      THelper extends (TValues[TField] extends readonly (infer U)[]
        ? {
            add: (item: U) => void
            update: (index: number, item: U) => void
            remove: (index: number) => void
          }
        : { handleChange: (newValue: TValues[TField]) => void }),
    >(props: {
      name: TField
      render: (props: {
        field: {
          value: TValues[TField]
          onBlur: () => void

          // A11y attributes
          id: string
          form: string
          'aria-describedby': string
          'aria-invalid': boolean
        }
        meta: {
          descriptionId: string
          errorId: string
          errors: StandardSchemaV1.Issue[]
          isPending: boolean
        }
        helpers: THelper
      }) => React.ReactNode
    }) {
      const { name, render } = props
      const form = formAtom.use()

      const formId = useAtomValue(form, (s) => s.formId)
      const value = useAtomValue(form, (s) => s.values[name])
      const errors = useAtomValue(form, (s) => s.errors[name] ?? [])
      const isPending = useAtomValue(form, (s) => s.isPending)
      const set = useAtomSet(form)

      const currentValueRef = React.useRef(value)

      const validator = React.useMemo(
        () =>
          Schema.decodeUnknownResult(self._fields[name as keyof TFields], {
            errors: 'all',
          }),
        [name]
      )

      const handleBlur = React.useCallback(() => {
        if (currentValueRef.current === value) return

        const result = validator(value)
        if (result._tag === 'Failure') {
          const { issues } = self._formatter(result.failure.issue)
          set((prev) => ({
            ...prev,
            errors: { ...prev.errors, [name]: issues },
          }))
        }

        currentValueRef.current = value
      }, [name, set, validator, value])

      const id = `${formId}-${String(name)}`
      const descriptionId = `${id}-description`
      const errorId = `${id}-error`

      const field = React.useMemo(
        () => ({
          value,
          onBlur: handleBlur,

          id,
          form: formId,
          'aria-describedby': errors.length
            ? `${descriptionId} ${errorId}`
            : descriptionId,
          'aria-invalid': errors.length > 0,
        }),
        [value, handleBlur, id, formId, descriptionId, errorId, errors.length]
      )

      const meta = React.useMemo(
        () => ({ descriptionId, errorId, errors, isPending }),
        [descriptionId, errorId, errors, isPending]
      )

      const handleChange = React.useCallback(
        (newValue: TValues[TField]) =>
          set((prev) => ({
            ...prev,
            values: { ...prev.values, [name]: newValue },
            errors: { ...prev.errors, [name]: EMPTY_ERRORS },
          })),
        [name, set]
      )

      const add = React.useCallback(
        (item: TValues[keyof TValues]) =>
          Array.isArray(value) &&
          set((prev) => {
            const array = prev.values[name] as unknown as unknown[]
            return {
              ...prev,
              values: { ...prev.values, [name]: [...array, item] },
              errors: { ...prev.errors, [name]: EMPTY_ERRORS },
            }
          }),
        [set, name, value]
      )

      const update = React.useCallback(
        (index: number, item: TValues[keyof TValues]) =>
          Array.isArray(value) &&
          set((prev) => {
            const array = prev.values[name] as unknown as unknown[]
            const newArray = [...array]
            newArray[index] = item
            return {
              ...prev,
              values: { ...prev.values, [name]: newArray },
              errors: { ...prev.errors, [name]: EMPTY_ERRORS },
            }
          }),
        [set, name, value]
      )

      const remove = React.useCallback(
        (index: number) =>
          Array.isArray(value) &&
          set((prev) => {
            const array = prev.values[name] as unknown as unknown[]
            const newArray = [...array]
            newArray.splice(index, 1)
            return { ...prev, values: { ...prev.values, [name]: newArray } }
          }),
        [set, name, value]
      )

      const helpers = React.useMemo(
        () =>
          Array.isArray(value) ? { add, update, remove } : { handleChange },
        [value, add, update, remove, handleChange]
      ) as THelper

      return render({ field, meta, helpers })
    }

    const useSubmit = <TError = Error, TData = unknown>(
      onSubmit: (
        values: TValues
      ) => Effect.Effect<TData, TError> | Promise<TData> | TData,
      options: {
        onSuccess?: (data: NoInfer<TData>) => Promise<unknown> | unknown
        onError?: (
          error: NoInfer<TError> & {
            match: (handlers: FormBuilder.ExtractTaggedUnion<TError>) => void
          }
        ) => Promise<unknown> | unknown
      } = {}
    ) => {
      const form = formAtom.use()
      const set = useAtomSet(form)

      const valuesRef = React.useRef({} as TValues)

      useAtomSubscribe(form, (state) => (valuesRef.current = state.values), {
        immediate: true,
      })

      const validator = React.useMemo(() => {
        let schema = Schema.Struct(this._fields)
        for (const { refinement, options: _options } of this._refinements)
          schema = schema.check(
            Schema.makeFilter((values) =>
              refinement(values) ? undefined : _options
            )
          )

        return Schema.decodeUnknownResult(schema, { errors: 'all' })
      }, [])

      return React.useCallback(
        async (event?: React.SubmitEvent) => {
          if (event) event.preventDefault()

          set((prev) => ({ ...prev, isPending: true }))

          try {
            const parsedValue = validator(valuesRef.current)
            if (parsedValue._tag === 'Failure') {
              const { issues } = this._formatter(parsedValue.failure.issue)

              return set((prev) => {
                const newErrors = { ...prev.errors }
                for (const issue of issues) {
                  const [path] = issue.path as [keyof TValues]
                  newErrors[path] = [...(newErrors[path] ?? []), issue]
                }
                return { ...prev, errors: newErrors, isPending: false }
              })
            }
            set((prev) => ({
              ...prev,
              errors: {} as Record<keyof TValues, StandardSchemaV1.Issue[]>,
            }))

            const result = await onSubmit(parsedValue.success as never)

            if (Effect.isEffect(result))
              await Effect.runPromise(
                result.pipe(
                  Effect.tap((data) =>
                    Effect.sync(() => options.onSuccess?.(data))
                  ),
                  Effect.catch((error) =>
                    Effect.sync(() => {
                      if (!options.onError) return
                      options.onError(self.createMatchableError<TError>(error))
                    })
                  )
                )
              )
            else options.onSuccess?.(result as TData)
          } catch (error) {
            options.onError?.(self.createMatchableError(error as TError))
          } finally {
            set((prev) => ({ ...prev, isPending: false }))
          }
        },
        [set, validator, onSubmit, options]
      )
    }

    function useValue<TSelected>(
      selector: (state: FormBuilder.State<TValues>) => TSelected
    ): TSelected {
      const form = formAtom.use()
      return useAtomValue(form, (state) => selector(state))
    }

    return {
      use: formAtom.use,
      useValue,
      useSubmit,

      Provider,
      Field,
    }
  }

  private constructor() {
    this._fields = {} as TFields
    this._refinements = []
    this._formatter = SchemaIssue.makeFormatterStandardSchemaV1()
  }

  // oxlint-disable-next-line typescript/ban-types typescript/no-empty-object-type
  public static get empty(): FormBuilder<{}> {
    return new FormBuilder()
  }

  public add<TField extends string, TSchema extends Schema.Constraint>(
    field: TField,
    schema: TSchema
  ): FormBuilder<TFields & Record<TField, TSchema>> {
    this._fields = { ...this._fields, [field]: schema }
    return this as never
  }

  public refine<TRefinement extends FormBuilder.Refinement<TFields>>(
    refinement: TRefinement['refinement'],
    options: TRefinement['options']
  ): this {
    this._refinements = [...this._refinements, { refinement, options }]
    return this
  }

  // oxlint-disable-next-line class-methods-use-this
  private createMatchableError<E>(error: E): E & {
    match: (handlers: FormBuilder.ExtractTaggedUnion<E>) => void
  } {
    return Object.assign(error as object, {
      match: (handlers: FormBuilder.ExtractTaggedUnion<E>) =>
        Match.value(error).pipe(
          Match.tags(handlers as never),
          Match.exhaustive as never
        ),
    }) as never
  }
}

export namespace FormBuilder {
  export interface Refinement<
    TFields extends Record<string, Schema.Constraint>,
  > {
    refinement: (fields: Schema.Struct<TFields>['Type']) => boolean
    options: {
      path: (keyof TFields)[]
      issue: string
    }
  }

  export interface State<TValues> {
    formId: string
    values: TValues
    errors: Record<keyof TValues, StandardSchemaV1.Issue[]>
    isPending: boolean
  }

  type UnionToIntersection<U> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type ExtractTaggedUnion<T> = UnionToIntersection<
    T extends {
      readonly _tag: infer Tag extends string | number | symbol
    }
      ? Partial<{
          [K in Tag]: (error: Extract<T, { readonly _tag: K }>) => void
        }>
      : never
  >
}
