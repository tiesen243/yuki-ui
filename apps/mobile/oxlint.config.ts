import core from '@yuki/oxc/core'
import react from '@yuki/oxc/react'
import { defineConfig } from 'oxlint'

export default defineConfig({
  extends: [core, react],
  ignorePatterns: ['uniwind-types.d.ts'],
})
