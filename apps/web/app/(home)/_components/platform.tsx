import {
  Layers3Icon,
  LockKeyholeIcon,
  TerminalIcon,
  SmartphoneIcon,
  ArrowRightIcon,
} from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardFooter } from '@/components/ui/card'
import { Typography } from '@/registry/ui/typography'

const platformCards = [
  {
    icon: Layers3Icon,
    title: 'UI',
    description:
      'A flexible component foundation built around familiar shadcn/ui patterns.',
    href: '/docs/components',
    action: 'Explore components',
  },
  {
    icon: LockKeyholeIcon,
    title: 'Auth',
    description:
      'Authentication primitives and adapters that keep identity concerns close to your app.',
    href: '/docs/auth',
    action: 'Explore auth',
  },
  {
    icon: TerminalIcon,
    title: 'Developer tools',
    description:
      'Hooks and libraries for common application concerns without unnecessary abstractions.',
    href: '/docs/hooks',
    action: 'Explore tools',
  },
  {
    icon: SmartphoneIcon,
    title: 'Native',
    description:
      'React Native components with the same design language and compositional mindset.',
    href: '/docs/native',
    action: 'Explore native',
  },
]

export const PlatformSection: React.FC = () => (
  <section className='container flex flex-col gap-4'>
    <div className='flex flex-col gap-3'>
      <Badge className='self-start' variant='secondary'>
        One ecosystem
      </Badge>
      <Typography variant='h2'>More than a component library.</Typography>
      <Typography className='text-muted-foreground'>
        Bring the same source-first philosophy to the foundations that sit
        around your UI.
      </Typography>
    </div>

    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {platformCards.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <div className='flex size-8 items-center justify-center rounded-lg border bg-muted'>
              <item.icon className='size-5 shrink-0' />
            </div>
            <Typography variant='h3'>{item.title}</Typography>
            <Typography className='text-muted-foreground' variant='p'>
              {item.description}
            </Typography>
          </CardHeader>
          <CardFooter className='mt-auto'>
            <Button
              variant='ghost'
              nativeButton={false}
              render={<Link href={item.href} />}
              className='w-full'
            >
              {item.action}
              <ArrowRightIcon className='transition-transform group-hover/button:translate-x-1' />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </section>
)
