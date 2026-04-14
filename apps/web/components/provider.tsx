'use client'

import { RootProvider } from 'fumadocs-ui/provider/next'

import SearchDialog from '@/components/search'
import { ToastProvider } from '@/registry/ui/toast'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider
      search={{ SearchDialog }}
      theme={{ disableTransitionOnChange: true }}
    >
      <ToastProvider>{children}</ToastProvider>
    </RootProvider>
  )
}
