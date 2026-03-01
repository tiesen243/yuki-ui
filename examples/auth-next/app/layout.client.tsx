'use client'

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { SessionProvider } from '@/hooks/use-session'

const queryCache = new QueryCache({
  onError: (error) => {
    console.error('Query error:', error)
  },
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      retryDelay: (failureCount) => Math.min(1000 * 2 ** failureCount, 30_000),
    },
  },
  queryCache,
})

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider>{children}</SessionProvider>
  </QueryClientProvider>
)
