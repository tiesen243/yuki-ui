import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { GithubIcon, ShadcnIcon, SparklesIcon } from '@yuki/ui/icons'

import { Typography } from '@/registry/ui/typography'

export default function HomePage() {
  return (
    <main className='container flex flex-1 flex-col items-center justify-center py-16'>
      <div className='mx-auto max-w-4xl text-center'>
        <Typography
          variant='h1'
          component='h1'
          className='mb-6 text-4xl font-bold tracking-tight sm:text-6xl'
        >
          Welcome to{' '}
          <span className='bg-gradient-to-r from-normal to-insert bg-clip-text text-transparent'>
            Yuki UI
          </span>
        </Typography>

        <Typography
          variant='h3'
          component='p'
          className='mb-8 text-xl text-muted-foreground'
        >
          A modern UI component library for React built on top of shadcn/ui.
          Beautiful, accessible, and customizable components for your next
          project.
        </Typography>

        <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
          <Button size='lg' asChild>
            <Link href='/docs/introduction'>
              <SparklesIcon />
              Get Started
            </Link>
          </Button>
          <Button variant='secondary' size='lg' asChild>
            <a
              href='https://ui.shadcn.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <ShadcnIcon />
              Explore shadcn/ui
            </a>
          </Button>
          <Button variant='outline' size='lg' asChild>
            <a
              href='https://github.com/tiesen243/yuki-ui'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GithubIcon />
              View on GitHub
            </a>
          </Button>
        </div>
      </div>
    </main>
  )
}
