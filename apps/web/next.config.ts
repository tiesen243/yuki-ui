import type { NextConfig } from 'next'

import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const config = {
  typedRoutes: true,
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
} satisfies NextConfig

export default withMDX(config)

if (!process.env.VERCEL)
  // oxlint-disable-next-line promise/prefer-await-to-then
  import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev())
