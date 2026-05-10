'use client'

import { RootProvider } from '@fumadocs/base-ui/provider/next'

import SearchDialog from '@/components/search'
import { ToastProvider } from '@/registry/ui/toast'

export function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootProvider
      theme={{ disableTransitionOnChange: true }}
      search={{ SearchDialog }}
    >
      <ToastProvider>{children}</ToastProvider>
    </RootProvider>
  )
}
