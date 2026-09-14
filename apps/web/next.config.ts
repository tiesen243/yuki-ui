import type { NextConfig } from 'next'

import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const config = {
  typedRoutes: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },

  // oxlint-disable-next-line require-await
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs',
        permanent: true,
      },
    ]
  },
} satisfies NextConfig

export default withMDX(config)
