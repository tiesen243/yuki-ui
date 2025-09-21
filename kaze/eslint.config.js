import baseConfig, { restrictEnvAccess } from '@yuki/eslint-config/base'
import nextConfig from '@yuki/eslint-config/next'
import reactConfig from '@yuki/eslint-config/react'

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.next/**', '.source/**', 'registry/auth/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  ...restrictEnvAccess,
]
