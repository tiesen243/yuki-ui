import type { RegistryItem } from 'shadcn/schema'

import { getBaseUrl } from '@/lib/utils'

const core = ['crypto', 'jwt', 'password']
const supportedProviders = [
  'base',
  'discord',
  'facebook',
  'figma',
  'github',
  'google',
  'vercel',
]

export const registryAuth = [
  {
    name: 'auth',
    type: 'registry:block',
    title: 'Authentication',
    description: 'Core authentication utilities and hooks',
    dependencies: ['@tanstack/react-query', 'react'],
    files: [
      ...core.map((item) => ({
        type: 'registry:item' as const,
        path: `registry/auth/server/core/${item}.ts`,
        target: `server/auth/core/${item}.ts`,
      })),
      ...supportedProviders.map((provider) => ({
        type: 'registry:item' as const,
        path: `registry/auth/server/providers/${provider}.ts`,
        target: `server/auth/providers/${provider}.ts`,
      })),
      {
        type: 'registry:item',
        path: 'registry/auth/server/config.ts',
        target: 'server/auth/config.ts',
      },
      {
        type: 'registry:item',
        path: 'registry/auth/server/types.ts',
        target: 'server/auth/types.ts',
      },
      {
        type: 'registry:lib',
        path: 'registry/auth/lib/cuid.ts',
      },
      {
        type: 'registry:hook',
        path: 'registry/auth/hooks/use-session.tsx',
      },
    ],
  },

  {
    name: 'auth-session',
    type: 'registry:block',
    title: 'Session Authentication',
    description: 'Session based authentication',
    registryDependencies: [`${getBaseUrl()}/r/auth.json`],
    files: [
      {
        type: 'registry:item',
        path: 'registry/auth/server/core/index.ts',
        target: 'server/auth/core/index.ts',
      },
      {
        type: 'registry:item',
        path: 'registry/auth/server/index.ts',
        target: 'server/auth/index.ts',
      },
    ],
  },

  {
    name: 'auth-jwt',
    type: 'registry:block',
    title: 'JWT Authentication',
    description: 'JWT based authentication',
    registryDependencies: [`${getBaseUrl()}/r/auth.json`],
    files: [
      {
        type: 'registry:item',
        path: 'registry/auth/server/core/index.jwt.ts',
        target: 'server/auth/core/index.ts',
      },
      {
        type: 'registry:item',
        path: 'registry/auth/server/index.jwt.ts',
        target: 'server/auth/index.ts',
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
    files: [
      {
        type: 'registry:item',
        path: 'registry/auth/schemas/drizzle.schema',
        target: 'server/db/schema.auth.ts',
      },
      {
        type: 'registry:item',
        path: 'registry/auth/server/config.drizzle.ts',
        target: 'server/auth/config.ts',
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
    files: [
      {
        type: 'registry:item',
        path: 'registry/auth/schemas/prisma.schema',
        target: 'prisma/schema.auth.prisma',
      },
      {
        type: 'registry:item',
        path: 'registry/auth/server/config.prisma.ts',
        target: 'server/auth/config.ts',
      },
    ],
  },

  {
    name: 'auth-adapter-mongoose',
    type: 'registry:block',
    title: 'Mongoose ORM Integration',
    description: 'Integrate authentication with Mongoose ORM',
    dependencies: ['mongoose'],
    files: [
      {
        type: 'registry:item',
        path: 'registry/auth/schemas/mongoose.schema',
        target: 'server/db/schema.auth.ts',
      },
      {
        type: 'registry:item',
        path: 'registry/auth/server/config.mongoose.ts',
        target: 'server/auth/config.ts',
      },
    ],
  },
] satisfies RegistryItem[]
