import '@yuki/validators/env'

import type { NextConfig } from 'next'
import { createMDX } from 'fumadocs-mdx/next'

const withMdx = createMDX()

const nextConfig = {
  reactStrictMode: true,

  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  transpilePackages: [
    '@yuki/api',
    '@yuki/auth',
    '@yuki/db',
    '@yuki/ui',
    '@yuki/validators',
  ],
} satisfies NextConfig

export default withMdx(nextConfig)
