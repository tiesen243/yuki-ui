import { Suspense } from 'react'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getLinkedAccounts, unlinkAccount } from '@/server/actions'
import { auth, signOut } from '@/server/auth'

export default function HomePage() {
  return (
    <main className='container py-6'>
      <Suspense fallback={<p>Loading user data...</p>}>
        <UserData />
      </Suspense>

      <section className='mt-12'>
        <h2 className='text-2xl font-semibold mb-4'>Linked Accounts</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Account ID</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Suspense
              fallback={
                <TableRow>
                  <TableCell colSpan={3}>Loading linked accounts...</TableCell>
                </TableRow>
              }
            >
              <LinkedAccounts />
            </Suspense>
          </TableBody>
        </Table>
      </section>
    </main>
  )
}

const UserData = async () => {
  const session = await auth({ headers: await headers() })

  return (
    <>
      <pre className='bg-accent text-accent-foreground p-4 rounded-md overflow-x-auto'>
        {JSON.stringify(session, null, 2)}
      </pre>

      <div className='flex items-center justify-center mt-6'>
        {session.user ? (
          <form
            action={async () => {
              'use server'
              await signOut({ headers: await headers() })
              revalidatePath('/')
            }}
          >
            <Button>Logout</Button>
          </form>
        ) : (
          <Button asChild>
            <Link href='/login'>Login</Link>
          </Button>
        )}
      </div>
    </>
  )
}

const LinkedAccounts = async () => {
  const accounts = await getLinkedAccounts()

  return accounts.map((account) => (
    <TableRow key={`${account.provider}-${account.accountId}`}>
      <TableCell>{account.provider}</TableCell>
      <TableCell>{account.accountId}</TableCell>
      <TableCell>
        <form
          action={async () => {
            'use server'
            await unlinkAccount(account.provider, account.accountId)
          }}
        >
          <Button type='submit' variant='destructive' size='sm'>
            Unlink
          </Button>
        </form>
      </TableCell>
    </TableRow>
  ))
}
