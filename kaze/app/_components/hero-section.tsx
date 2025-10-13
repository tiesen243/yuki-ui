import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { ArrowRightIcon } from '@yuki/ui/icons'

import { CopyButton } from '@/app/_components/copy-button'

export function HeroSection() {
  return (
    <section id='hero' className='relative overflow-hidden py-20 md:py-32'>
      <div className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]' />

      <div className='container max-w-4xl text-center'>
        <h2 className='mb-6 text-5xl font-bold tracking-tight text-balance md:text-7xl'>
          Yuki UI Components
          <br />
          <span className='text-muted-foreground'>for Modern Web Apps</span>
        </h2>

        <p className='mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-pretty text-muted-foreground'>
          A comprehensive collection of accessible, customizable components
          built with React, TypeScript, and Tailwind CSS. Install with a single
          command.
        </p>

        <Button size='lg' className='mb-12 gap-2 text-base' asChild>
          <Link href={'/docs' as '/docs/[[...slugs]]'}>
            Get Started
            <ArrowRightIcon />
          </Link>
        </Button>

        <div className='mx-auto max-w-3xl'>
          <div className='relative rounded-lg border bg-muted/50 p-4'>
            <div className='mb-2 flex items-center justify-between'>
              <span className='font-mono text-xs text-muted-foreground'>
                Terminal
              </span>
              <CopyButton text='bunx --bun shadcn@latest add https://yuki-ui.vercel.app/r/{name}.json' />
            </div>

            <pre className='overflow-x-auto rounded-md bg-background py-4'>
              <code className='block font-mono text-sm break-all text-foreground md:text-base'>
                <span className='text-muted-foreground'>$</span> bunx --bun
                shadcn@latest add https://yuki-ui.vercel.app/r/{`{name}`}.json
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
