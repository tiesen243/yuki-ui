import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['typescript'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            regex: '^effect($|/unstable/[^/]+$)',
            message:
              "Please use namespace imports (e.g., import * as Effect from 'effect') instead of named imports.",
          },
        ],
      },
    ],
  },
})
