import { defineConfig } from 'eslint/config'

import baseConfig from '@yuki/eslint-config/base'

export default defineConfig(
  {
    ignores: ['dist/**'],
  },
  ...baseConfig,
)
