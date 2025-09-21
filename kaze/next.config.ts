import '@yuki/validators/env'

import type { NextConfig } from 'next'
import { createMDX } from 'fumadocs-mdx/next'

const withMdx = createMDX()

const nextConfig = {
  images: { unoptimized: true },
  reactStrictMode: true,
  typedRoutes: true,

  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  transpilePackages: ['@yuki/ui', '@yuki/validators'],
} satisfies NextConfig

export default withMdx(nextConfig)
