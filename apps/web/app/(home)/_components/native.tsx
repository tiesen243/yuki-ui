import { ArrowRightIcon, CheckIcon } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Typography } from '@/registry/ui/typography'

const features = [
  {
    label: 'Native UI',
    description: 'Native controls and touch interactions.',
  },
  {
    label: 'Shared patterns',
    description: 'Familiar composition across platforms.',
  },
] as const

const highlights = [
  'Native bottom sheets instead of browser popovers',
  'Mobile-friendly controlled state patterns',
  'Accessibility semantics for native controls',
] as const

export const NativeSection: React.FC = () => (
  <section className='container grid items-center gap-10 lg:grid-cols-2'>
    <Card className='bg-muted/30'>
      <CardHeader>
        <Badge className='self-start' variant='secondary'>
          React Native
        </Badge>
        <Typography variant='h2'>
          Same design language. Native interaction.
        </Typography>
        <Typography className='text-muted-foreground'>
          Native implementations keep the compositional feel of the web system
          while respecting mobile interaction patterns.
        </Typography>
      </CardHeader>

      <CardContent className='grid gap-3 sm:grid-cols-2'>
        {features.map((feature) => (
          <div
            key={feature.label}
            className='rounded-lg border bg-background p-4'
          >
            <Typography variant='h4' as='h3'>
              {feature.label}
            </Typography>
            <Typography className='text-muted-foreground' variant='small'>
              {feature.description}
            </Typography>
          </div>
        ))}
      </CardContent>

      <CardFooter>
        <Button
          variant='outline'
          nativeButton={false}
          render={<Link href='/docs/native' />}
        >
          Explore native <ArrowRightIcon data-icon='inline-end' />
        </Button>
      </CardFooter>
    </Card>

    <div className='flex flex-col gap-5'>
      <Typography variant='h3'>
        One mental model from desktop to mobile.
      </Typography>
      <Typography className='text-muted-foreground' variant='p'>
        Move faster when your product spans platforms. Keep the vocabulary
        consistent without forcing browser behavior onto native surfaces.
      </Typography>

      <div className='flex flex-col gap-3'>
        {highlights.map((highlight) => (
          <div key={highlight} className='flex items-center gap-3'>
            <CheckIcon className='size-4 shrink-0' />
            <Typography className='text-muted-foreground' variant='small'>
              {highlight}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  </section>
)
