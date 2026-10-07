import { Code2Icon, ShieldCheckIcon, SparklesIcon, ZapIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardHeader } from '@/components/ui/card'
import { Typography } from '@/registry/ui/typography'

const principles = [
  {
    icon: SparklesIcon,
    title: 'Composable',
    description:
      'Start with primitives, compose larger patterns, and keep the source close to your application.',
  },
  {
    icon: Code2Icon,
    title: 'Source-owned',
    description:
      'Install source into your repository instead of depending on a black-box component package.',
  },
  {
    icon: ZapIcon,
    title: 'Fast to ship',
    description:
      'Go from an empty page to a polished product surface without rebuilding the same foundations.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Built for real products',
    description:
      'Typed APIs, accessible defaults, authentication, database adapters, and practical utilities.',
  },
] as const

export const PrinciplesSection: React.FC = () => (
  <section className='container flex flex-col gap-4'>
    <div className='flex flex-col gap-3'>
      <Badge className='self-start' variant='outline'>
        Why it works
      </Badge>
      <Typography variant='h2'>
        A foundation that stays out of your way.
      </Typography>
      <Typography className='text-muted-foreground' variant='p'>
        The goal is not to hide your application architecture. It is to give you
        a strong starting point and let your project take over from there.
      </Typography>
    </div>

    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {principles.map((principle) => {
        const Icon = principle.icon

        return (
          <Card key={principle.title}>
            <CardHeader>
              <div className='flex size-8 items-center justify-center rounded-lg border bg-muted'>
                <Icon className='size-5 shrink-0' />
              </div>

              <Typography variant='h4' as='h3'>
                {principle.title}
              </Typography>
              <Typography className='text-muted-foreground' variant='p'>
                {principle.description}
              </Typography>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  </section>
)
