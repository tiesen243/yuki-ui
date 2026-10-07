import { BracesIcon, CommandIcon, WorkflowIcon, Code2Icon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Typography } from '@/registry/ui/typography'

const features = [
  {
    title: 'Composable APIs',
    description: 'Use a primitive alone or build a higher-level pattern.',
    icon: BracesIcon,
  },
  {
    title: 'Registry-driven',
    description: 'Install source exactly where your application expects it.',
    icon: CommandIcon,
  },
  {
    title: 'Easy to extend',
    description: 'Add your own conventions without fighting the toolkit.',
    icon: WorkflowIcon,
  },
  {
    title: 'Readable source',
    description: 'Debug and customize the implementation directly.',
    icon: Code2Icon,
  },
] as const

export const ShowcaseSection: React.FC = () => (
  <section className='container grid items-center gap-4 lg:grid-cols-2'>
    <Card className='overflow-hidden bg-muted/30'>
      <CardHeader className='border-b'>
        <Badge className='self-start' variant='secondary'>
          Composition
        </Badge>
        <Typography variant='h3' as='h2'>
          Small primitives. Real application UI.
        </Typography>
        <Typography className='text-muted-foreground' variant='p'>
          Compose familiar building blocks instead of adopting a new mental
          model for every screen.
        </Typography>
      </CardHeader>

      <CardContent className='flex flex-col gap-4'>
        <div className='grid gap-3 sm:grid-cols-2'>
          <Card>
            <CardHeader>
              <Typography variant='h3' as='h4'>
                Project settings
              </Typography>
              <Typography className='text-muted-foreground' variant='small'>
                Keep configuration close to the feature.
              </Typography>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
              <Input placeholder='Project name' />
              <Button>Save changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Typography variant='h3' as='h4'>
                Deployment status
              </Typography>
              <Typography className='text-muted-foreground' variant='small'>
                Your latest build is ready.
              </Typography>
            </CardHeader>
            <CardContent className='flex items-center justify-between gap-4'>
              <Badge>Production</Badge>
              <Button size='sm' variant='outline'>
                Open
              </Button>
            </CardContent>
            <CardContent className='flex items-center justify-between gap-4'>
              <Badge variant='secondary'>Preview</Badge>
              <Button size='sm' variant='outline'>
                Open
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>

    <section className='flex flex-col gap-4'>
      <Badge className='self-start' variant='outline'>
        Familiar by design
      </Badge>
      <Typography variant='h2' as='h3'>
        The UI feels familiar because the architecture is familiar.
      </Typography>
      <Typography className='text-muted-foreground' variant='p'>
        Build with the conventions you already know: composable primitives,
        variants, controlled state, and source-level customization.
      </Typography>

      <div className='grid gap-4 sm:grid-cols-2'>
        {features.map((feature) => (
          <div key={feature.title} className='flex items-baseline gap-3'>
            <feature.icon className='size-4 shrink-0' />
            <div className='flex flex-col gap-1'>
              <Typography variant='h4'>{feature.title}</Typography>
              <Typography className='text-muted-foreground' variant='small'>
                {feature.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </section>
  </section>
)
