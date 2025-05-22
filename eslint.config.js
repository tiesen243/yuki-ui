// @ts-nocheck

import jseslint from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import importPlugin from 'eslint-plugin-import'
import a11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

const baseConfig = tseslint.config(
  { ignores: ['*.config.*'] },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: { import: importPlugin },
    extends: [
      jseslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-unnecessary-condition': [
        'error',
        { allowConstantLoopConditions: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      'import/no-anonymous-default-export': 'warn',
    },
  },
  {
    linterOptions: { reportUnusedDisableDirectives: true },
    languageOptions: { parserOptions: { projectService: true } },
  },
)

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {Awaited<import('typescript-eslint').Config>} */
const reactConfig = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'jsx-a11y': a11yPlugin,
      'react-hooks': hooksPlugin,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...a11yPlugin.flatConfigs.strict.rules,
      ...hooksPlugin.configs['recommended-latest'].rules,

      'react/no-unknown-property': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
]

/** @type {Awaited<import('typescript-eslint').Config>} */
const nextjsConfig = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.flatConfig.recommended.rules,
      ...nextPlugin.flatConfig.coreWebVitals.rules,
    },
  },
]

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.next/**', '.source/**'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
]
