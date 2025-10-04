import type { RegistryItem } from 'shadcn/schema'

import { getBaseUrl } from '@/lib/utils'

const supportedProviders = ['discord', 'facebook', 'github', 'google']

export const registryAuth = [
  {
    name: 'auth',
    type: 'registry:file',
    title: 'Authentication Base',
    description: 'Authentication system with OAuth2 support',
    dependencies: ['next-themes'],
    registryDependencies: [
      `${getBaseUrl()}/r/form.json`,
      'dropdown-menu',
      'avatar',
      'button',
      'field',
      'input',
    ],
    files: [
      // Core files
      ...['cookies', 'crypto', 'index', 'password', 'types.d'].map((file) => ({
        path: `registry/auth/core/${file}.ts`,
        target: `server/auth/core/${file}.ts`,
        type: 'registry:file' as const,
      })),

      // Providers files
      ...['base', ...supportedProviders].map((file) => ({
        path: `registry/auth/providers/${file}.ts`,
        target: `server/auth/providers/${file}.ts`,
        type: 'registry:file' as const,
      })),

      // Auth files
      ...['csrf', 'index', 'rate-limit'].map((file) => ({
        path: `registry/auth/${file}.ts`,
        target: `server/auth/${file}.ts`,
        type: 'registry:file' as const,
      })),
      {
        path: 'registry/auth/react.tsx',
        target: 'hooks/use-session.tsx',
        type: 'registry:hook',
      },

      // Components
      {
        path: 'registry/auth/components/user-button.tsx',
        target: 'components/user-button.tsx',
        type: 'registry:component',
      },
      {
        path: 'registry/auth/components/login-form.tsx',
        target: 'components/login-form.tsx',
        type: 'registry:component',
      },
    ],
  },

  {
    name: 'auth-base',
    type: 'registry:file',
    title: 'Authentication',
    description: 'Authentication system with OAuth2 support',
    registryDependencies: [`${getBaseUrl()}/r/auth.json`],
    files: [
      {
        path: 'registry/auth/config.ts',
        target: 'server/auth/config.ts',
        type: 'registry:file',
      },
    ],
  },

  {
    name: 'auth-drizzle',
    type: 'registry:file',
    title: 'Authentication with Drizzle ORM',
    description: 'Authentication system with Drizzle ORM support',
    dependencies: ['drizzle-orm'],
    devDependencies: ['drizzle-kit'],
    registryDependencies: [`${getBaseUrl()}/r/auth.json`],
    files: [
      {
        path: 'registry/auth/configs/drizzle.schema.ts',
        target: 'server/db/auth-schema.ts',
        type: 'registry:file',
      },
      {
        path: 'registry/auth/configs/drizzle.config.ts',
        target: 'server/auth/config.ts',
        type: 'registry:file',
      },
    ],
  },

  {
    name: 'auth-prisma',
    type: 'registry:file',
    title: 'Authentication with Prisma ORM',
    description: 'Authentication system with Prisma ORM support',
    devDependencies: ['prisma'],
    registryDependencies: [`${getBaseUrl()}/r/auth.json`],
    files: [
      {
        path: 'registry/auth/configs/prisma.schema.prisma',
        target: 'prisma/auth-schema.prisma',
        type: 'registry:file',
      },
      {
        path: 'registry/auth/configs/prisma.config.ts',
        target: 'server/auth/config.ts',
        type: 'registry:file',
      },
    ],
  },

  {
    name: 'auth-mongoose',
    type: 'registry:file',
    title: 'Authentication with Mongoose ODM',
    description: 'Authentication system with Mongoose ODM support',
    dependencies: ['mongoose'],
    registryDependencies: [`${getBaseUrl()}/r/auth.json`],
    files: [
      {
        path: 'registry/auth/configs/mongoose.schema.ts',
        target: 'server/db/auth.models.ts',
        type: 'registry:file',
      },
      {
        path: 'registry/auth/configs/mongoose.config.ts',
        target: 'server/auth/config.ts',
        type: 'registry:file',
      },
    ],
  },
] satisfies RegistryItem[]
