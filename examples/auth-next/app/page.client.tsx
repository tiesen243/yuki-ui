'use client'

import { useSession } from '@/hooks/use-session'

export const Auth: React.FC = () => {
  const session = useSession()

  return <pre>{JSON.stringify(session, null, 2)}</pre>
}
