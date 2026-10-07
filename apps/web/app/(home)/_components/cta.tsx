import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

import { GithubIcon } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Typography } from '@/registry/ui/typography'

export const CTASection: React.FC = () => (
  <section className='container'>
    <Typography className='sr-only' variant='h2'>
      Start building
    </Typography>

    <Card className='border-dashed'>
      <CardContent className='flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-col gap-3'>
          <Badge className='self-start' variant='secondary'>
            Ready when you are
          </Badge>
          <Typography variant='h3'>Build something worth shipping.</Typography>
          <Typography className='text-muted-foreground'>
            Start with the foundation, then let your product take the lead.
          </Typography>
        </div>

        <div className='flex flex-wrap gap-3'>
          <Button nativeButton={false} render={<Link href='/docs' />}>
            Get started
            <ArrowRightIcon data-icon='inline-end' />
          </Button>
          <Button
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
            GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  </section>
)
