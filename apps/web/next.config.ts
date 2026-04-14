import type { NextConfig } from 'next'

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'
import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const config = {
  // output: 'export',
  typedRoutes: true,
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },

  transpilePackages: ['@vercel/og'],
} satisfies NextConfig

export default withMDX(config)

if (process.env.NODE_ENV === 'development') initOpenNextCloudflareForDev()
