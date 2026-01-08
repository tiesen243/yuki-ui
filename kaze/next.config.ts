import '@/env'

import type { NextConfig } from 'next'

import { createMDX } from 'fumadocs-mdx/next'

const withMdx = createMDX()

const nextConfig = {
  typedRoutes: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
} satisfies NextConfig

export default withMdx(nextConfig)
