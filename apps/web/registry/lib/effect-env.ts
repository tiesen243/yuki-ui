import * as Schema from 'effect/Schema'
import * as SchemaIssue from 'effect/SchemaIssue'

type InferSchemaType<T> =
  | { [K in keyof T]: T[K] extends Schema.Constraint ? T[K]['Type'] : never }
  | Record<string, string | undefined>

interface EffectEnvOptions<
  TPrefix extends string,
  TShared extends Record<string, Schema.Constraint>,
  TServer extends Record<string, Schema.Constraint>,
  TClient extends Record<string, Schema.Constraint>,
> {
  clientPrefix: TPrefix

  shared?: TShared

  server: {
    [K in keyof TServer]: K extends `${TPrefix}${string}`
      ? `Server env '${Extract<K, string>}' cannot start with '${TPrefix}'`
      : K extends Uppercase<Extract<K, string>>
        ? TServer[K]
        : `Server env '${Extract<K, string>}' must be uppercase`
  }

  client: {
    [K in keyof TClient]: K extends `${TPrefix}${string}`
      ? K extends Uppercase<Extract<K, string>>
        ? TClient[K]
        : `Client env '${Extract<K, string>}' must be uppercase`
      : `Client env '${Extract<K, string>}' must start with '${TPrefix}'`
  }

  runtimeEnv?: InferSchemaType<TShared & TServer & TClient>

  isServer?: boolean

  skipValidation?: boolean
}

type EffectEnvReturns<
  TShared extends Record<string, Schema.Constraint>,
  TServer extends Record<string, Schema.Constraint>,
  TClient extends Record<string, Schema.Constraint>,
  TEnv = TShared & TServer & TClient,
> = {
  [K in keyof TEnv]: TEnv[K] extends Schema.Constraint ? TEnv[K]['Type'] : never
}

export function effectEnv<
  TPrefix extends string,
  TShared extends Record<string, Schema.Constraint>,
  TServer extends Record<string, Schema.Constraint>,
  TClient extends Record<string, Schema.Constraint>,
  TEnv = EffectEnvReturns<TShared, TServer, TClient>,
>(opts: EffectEnvOptions<TPrefix, TShared, TServer, TClient>): TEnv {
  const { shared, server, client, runtimeEnv, skipValidation } = opts
  const isServer = opts.isServer ?? typeof window === 'undefined'

  const envSchema = Schema.decodeUnknownResult(
    Schema.Struct({
      ...shared,
      ...client,
      ...(isServer ? server : {}),
    }) as never
  )

  const env = runtimeEnv ?? process.env
  const result = envSchema(env, { errors: 'all' })

  console.log(env, result)

  if (!skipValidation && result._tag === 'Failure') {
    const { issues } = SchemaIssue.makeFormatterStandardSchemaV1()(
      result.failure.issue
    )

    throw new Error(
      `Invalid environment variables:\n${issues
        .map((issue) => `- ${issue.path}: ${issue.message}`)
        .join('\n')}`
    )
  }

  let envValues = {}
  if (result._tag === 'Success') envValues = result.success
  else if (skipValidation) envValues = env

  return new Proxy(envValues, {
    get(target, prop: string) {
      if (!isServer && prop in opts.server)
        throw new Error(
          `❌ Attempted to access a server-side environment variable on the client: ${prop}`
        )

      return target[prop as keyof typeof target]
    },
  }) as TEnv
}
