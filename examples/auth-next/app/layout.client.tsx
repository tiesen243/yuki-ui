'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { SessionProvider } from '@/hooks/use-session'

const queryClient = new QueryClient()

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider>{children}</SessionProvider>
  </QueryClientProvider>
)
