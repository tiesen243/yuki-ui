'use client'

import { env } from '@/registry/lib/effect-env'

export default function PlaygroundPage() {
  return <main>Playground {env.PUBLIC_API_URL}</main>
}
