import {
  ArrowRightIcon,
  ExternalLinkIcon,
  CheckIcon,
  Code2Icon,
} from 'lucide-react'
import Link from 'next/link'

import { GithubIcon } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Typography } from '@/registry/ui/typography'

const features = [
  { label: 'TypeScript-first', icon: CheckIcon },
  { label: 'React ready', icon: CheckIcon },
  { label: 'Source ownership', icon: CheckIcon },
] as const

const highlights = [
  { title: 'Install', description: 'Add what you need.' },
  { title: 'Inspect', description: 'Read the source.' },
  { title: 'Own', description: 'Change anything.' },
] as const

export const HeroSection: React.FC = () => (
  <section className='container grid items-center gap-5 pt-4 lg:grid-cols-2'>
    <div className='flex flex-col gap-4'>
      <Badge className='self-start rounded-full' variant='secondary'>
        An application toolkit for modern React
      </Badge>

      <Typography variant='h1' as='h2'>
        Build the product. Keep the source.
      </Typography>
      <Typography className='-mt-2 text-muted-foreground'>
        A source-first toolkit for Next.js that brings together shadcn/ui
        components, authentication, utilities, and native building blocks
        without locking your codebase to a runtime component library.
      </Typography>

      <div className='flex flex-wrap gap-3'>
        <Button size='lg' nativeButton={false} render={<Link href='/docs' />}>
          Read the docs <ArrowRightIcon data-icon='inline-end' />
        </Button>

        <Button
          size='lg'
          variant='outline'
          nativeButton={false}
          render={
            <Link
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
            />
          }
        >
          <GithubIcon data-icon='inline-start' />
          View source
          <ExternalLinkIcon data-icon='inline-end' />
        </Button>
      </div>

      <div className='flex flex-wrap gap-x-5 gap-y-2'>
        {features.map((feature) => (
          <div key={feature.label} className='flex items-center gap-2'>
            <feature.icon className='size-4 shrink-0' />
            <Typography
              className='text-muted-foreground'
              variant='small'
              as='span'
            >
              {feature.label}
            </Typography>
          </div>
        ))}
      </div>
    </div>

    <Card className='overflow-hidden bg-card/80 shadow-2xl'>
      <CardHeader className='flex items-center justify-between gap-4 border-b'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-lg border bg-muted'>
            <Code2Icon className='size-4 shrink-0' />
          </div>
          <div className='flex flex-col'>
            <Typography variant='h4' as='h2'>
              Your application
            </Typography>
            <Typography className='text-muted-foreground' variant='small'>
              Build from source, then make it yours.
            </Typography>
          </div>
        </div>

        <Badge variant='outline'>Next.js</Badge>
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
        <div className='rounded-lg border bg-muted/40 p-4'>
          <pre className='overflow-x-auto font-mono text-xs leading-6 whitespace-pre-wrap'>
            <code>
              <span className='text-muted-foreground'>import</span> {'{'} Button{' '}
              {'}'} <span className='text-muted-foreground'>from</span>{' '}
              &quot;@/components/ui/button&quot;
              {'\n'}
              <span className='text-muted-foreground'>import</span> {'{'} auth{' '}
              {'}'} <span className='text-muted-foreground'>from</span>{' '}
              &quot;@/lib/auth&quot;
              {'\n\n'}
              <span className='text-muted-foreground'>
                export default function
              </span>{' '}
              Dashboard() {'{'}
              {'\n  '}
              <span className='text-muted-foreground'>return</span>{' '}
              &lt;Button&gt;Open dashboard&lt;/Button&gt;
              {'\n}'}
            </code>
          </pre>
        </div>

        <div className='grid gap-3 sm:grid-cols-3'>
          {highlights.map((highlight) => (
            <div
              key={highlight.title}
              className='rounded-lg border bg-background p-4'
            >
              <Typography variant='h4' as='h3'>
                {highlight.title}
              </Typography>
              <Typography className='text-muted-foreground' variant='small'>
                {highlight.description}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </section>
)
