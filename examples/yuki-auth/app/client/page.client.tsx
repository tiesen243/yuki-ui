'use client'

import { Button } from '@/components/ui/button'
import { useSession } from '@/hooks/use-session'

export const Profile: React.FC = () => {
  const { status, session, signOut } = useSession()

  if (status === 'loading') return <p>Loading...</p>

  if (status === 'unauthenticated')
    return <p>Please log in to see your profile.</p>

  return (
    <div className='grid gap-4'>
      <pre className='bg-accent text-accent-foreground p-4 rounded-md'>
        {JSON.stringify(session, null, 2)}
      </pre>

      <Button onClick={signOut}>Sign Out</Button>
    </div>
  )
}
