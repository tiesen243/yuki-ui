import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactStrictMode: true,
  reactCompiler: true,
  typedRoutes: true,
  typescript: { ignoreBuildErrors: true },
}

export default nextConfig
