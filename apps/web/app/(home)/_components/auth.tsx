import {
  ShieldCheckIcon,
  DatabaseIcon,
  LockKeyholeIcon,
  ArrowRightIcon,
} from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Typography } from '@/registry/ui/typography'

const items = [
  {
    icon: ShieldCheckIcon,
    title: 'User',
    description: 'The canonical identity in your application.',
  },
  {
    icon: DatabaseIcon,
    title: 'Account',
    description: 'Connect credentials and external providers.',
  },
  {
    icon: LockKeyholeIcon,
    title: 'Session',
    description: 'Represent active authenticated sessions.',
  },
]

export const AuthSection: React.FC = () => (
  <section className='container grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]'>
    <div className='flex flex-col gap-5'>
      <Badge className='self-start' variant='outline'>
        Authentication
      </Badge>
      <Typography variant='h2'>
        Identity should feel like part of your application.
      </Typography>
      <Typography className='text-muted-foreground'>
        Use a typed authentication layer with a predictable data model and
        adapters for the database stack you already use.
      </Typography>
      <Button
        className='self-start'
        variant='outline'
        nativeButton={false}
        render={<Link href='/docs/auth' />}
      >
        Read the auth docs <ArrowRightIcon data-icon='inline-end' />
      </Button>
    </div>

    <Card>
      <CardHeader className='border-b'>
        <Typography variant='h3'>Application data model</Typography>
        <Typography className='text-muted-foreground' variant='small'>
          Keep identity and session state explicit.
        </Typography>
      </CardHeader>

      <CardContent className='flex flex-col gap-3'>
        {items.map((item, index) => (
          <div key={item.title}>
            <div className='flex items-center gap-4'>
              <div className='flex size-8 items-center justify-center rounded-lg border bg-muted'>
                <item.icon className='size-5 shrink-0' />
              </div>
              <div className='flex flex-1 flex-col gap-1'>
                <Typography variant='h4'>{item.title}</Typography>
                <Typography className='text-muted-foreground' variant='small'>
                  {item.description}
                </Typography>
              </div>
            </div>

            {index < items.length - 1 ? <Separator className='mt-3' /> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  </section>
)
