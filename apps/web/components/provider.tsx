'use client'

import { RootProvider } from 'fumadocs-ui/provider/next'

import SearchDialog from '@/components/search'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider
      search={{ SearchDialog }}
      theme={{ disableTransitionOnChange: true }}
    >
      {children}
    </RootProvider>
  )
}
