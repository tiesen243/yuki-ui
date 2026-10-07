import { CommandIcon, Code2Icon, WorkflowIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardHeader } from '@/components/ui/card'
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
  <section className='container flex flex-col gap-4'>
    <Badge className='self-start' variant='outline'>
      Developer experience
    </Badge>
    <Typography variant='h2'>
      Install it like a library. Maintain it like your code.
    </Typography>
    <Typography className='text-muted-foreground' variant='p'>
      Registry commands give you a fast starting point without taking ownership
      away from your team.
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
  </section>
)
