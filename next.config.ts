import type { NextConfig } from 'next'
import { createMDX } from 'fumadocs-mdx/next'

const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
} satisfies NextConfig

const withMDX = createMDX({})

export default withMDX(nextConfig)
