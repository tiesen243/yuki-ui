import core from '@yuki/oxc/core'
import next from '@yuki/oxc/next'
import react from '@yuki/oxc/react'
import { defineConfig } from 'oxlint'

export default defineConfig({
  extends: [core, react, next],
})
