import type { RegistryItem } from 'shadcn/schema'

import { getBaseUrl } from '@/lib/utils'

const core = ['crypto', 'index', 'jwt', 'password', 'types']
const supportedProviders = [
  'base',
  'discord',
  'facebook',
  'figma',
  'github',
  'google',
  'vercel',
]
const configs = ['adapter', 'config', 'index']

export const registryAuth = [
  {
    name: 'auth',
    type: 'registry:block',
    title: 'Authentication',
    description: 'Core authentication utilities and hooks',
    dependencies: ['@tanstack/react-query'],
    registryDependencies: [`${getBaseUrl()}/r/create-id.json`],
    files: [
      ...core.map((item) => ({
        type: 'registry:item' as const,
        path: `registry/auth/server/core/${item}.ts`,
        target: `server/auth/core/${item}.ts`,
      })),
      ...supportedProviders.map((provider) => ({
        type: 'registry:item' as const,
        path: `registry/auth/server/core/providers/${provider}.ts`,
        target: `server/auth/core/providers/${provider}.ts`,
      })),
      ...configs.map((config) => ({
        type: 'registry:item' as const,
        path: `registry/auth/server/${config}.ts`,
        target: `server/auth/${config}.ts`,
      })),
      {
        type: 'registry:hook',
        path: 'registry/auth/hooks/use-session.tsx',
      },
    ],
  },

  {
    name: 'auth-adapter-drizzle',
    type: 'registry:block',
    title: 'Drizzle ORM Integration',
    description: 'Integrate authentication with Drizzle ORM',
    dependencies: ['drizzle-orm'],
    devDependencies: ['drizzle-kit'],
    registryDependencies: [`${getBaseUrl()}/r/auth.json`],
    files: [
      {
        type: 'registry:item',
        path: 'registry/auth/schemas/drizzle.schema',
        target: 'server/db/schemas/auth.ts',
      },
      {
        type: 'registry:item',
        path: 'registry/auth/adapters/drizzle.adapter',
        target: 'server/auth/adapter.ts',
      },
    ],
  },

  {
    name: 'auth-adapter-prisma',
    type: 'registry:block',
    title: 'Prisma ORM Integration',
    description: 'Integrate authentication with Prisma ORM',
    dependencies: ['@prisma/client'],
    devDependencies: ['prisma'],
    registryDependencies: [`${getBaseUrl()}/r/auth.json`],
    files: [
      {
        type: 'registry:item',
        path: 'registry/auth/schemas/prisma.schema',
        target: 'prisma/schemas/auth.prisma',
      },
      {
        type: 'registry:item',
        path: 'registry/auth/adapters/prisma.adapter',
        target: 'server/auth/adapter.ts',
      },
    ],
  },

  {
    name: 'auth-adapter-mongoose',
    type: 'registry:block',
    title: 'Mongoose ORM Integration',
    description: 'Integrate authentication with Mongoose ORM',
    dependencies: ['mongoose'],
    registryDependencies: [`${getBaseUrl()}/r/auth.json`],
    files: [
      {
        type: 'registry:item',
        path: 'registry/auth/schemas/mongoose.schema',
        target: 'server/db/models/auth.ts',
      },
      {
        type: 'registry:item',
        path: 'registry/auth/adapters/mongoose.adapter',
        target: 'server/auth/adapter.ts',
      },
    ],
  },
] satisfies RegistryItem[]
