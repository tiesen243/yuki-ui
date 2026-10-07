import {
  CommandIcon,
  Code2Icon,
  WorkflowIcon,
  BookOpenIcon,
  TerminalIcon,
} from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Typography } from '@/registry/ui/typography'

const features = [
  {
    title: 'Install',
    description: 'Pull the source through the registry.',
    icon: CommandIcon,
  },
  {
    title: 'Inspect',
    description: 'Understand every line in your repository.',
    icon: Code2Icon,
  },
  {
    title: 'Adapt',
    description: 'Make it fit your product and conventions.',
    icon: WorkflowIcon,
  },
] as const

export const WorkflowSection: React.FC = () => (
  <section className='container grid gap-8 lg:grid-cols-[1.1fr_0.9fr]'>
    <div className='flex flex-col gap-5'>
      <Badge className='self-start' variant='outline'>
        Developer experience
      </Badge>
      <Typography variant='h2'>
        Install it like a library. Maintain it like your code.
      </Typography>
      <Typography className='text-muted-foreground' variant='p'>
        Registry commands give you a fast starting point without taking
        ownership away from your team.
      </Typography>

      <div className='grid gap-4 sm:grid-cols-3'>
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <feature.icon className='size-4 shrink-0' />
              <Typography variant='h4' as='h3'>
                {feature.title}
              </Typography>
              <Typography className='text-muted-foreground' variant='small'>
                {feature.description}
              </Typography>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>

    <Card>
      <CardHeader>
        <Typography variant='h3'>Start from the docs</Typography>
        <Typography className='text-muted-foreground' variant='p'>
          Find the right primitive, understand its API, and install only what
          you need.
        </Typography>
      </CardHeader>

      <CardContent className='flex flex-col gap-3'>
        <Button nativeButton={false} render={<Link href='/docs' />}>
          <BookOpenIcon data-icon='inline-start' /> Browse documentation
        </Button>
        <Button
          variant='outline'
          nativeButton={false}
          render={<Link href='/docs/installation' />}
        >
          <TerminalIcon data-icon='inline-start' />
          Installation guide
        </Button>
      </CardContent>
    </Card>
  </section>
)
