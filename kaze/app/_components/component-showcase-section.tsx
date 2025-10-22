import Link from 'next/link'

import { Badge } from '@yuki/ui/badge'
import { Button } from '@yuki/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@yuki/ui/card'
import { ArrowRightIcon } from '@yuki/ui/icons'

const categories = [
  {
    title: 'Components',
    description: 'UI building blocks',
    items: [
      'Nvim Statusline',
      'Open Graph Image',
      'Password Input',
      'Progress Button',
      'Typography',
    ],
  },
  {
    title: 'Hooks',
    description: 'React utilities',
    items: ['useDebounce', 'useForm'],
  },
  {
    title: 'Utilities',
    description: 'Helper functions',
    items: ['createEnv()'],
  },
]

export function ComponentShowcaseSection() {
  return (
    <section id='components' className='py-20 md:py-32'>
      <div className='container'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='mb-4 text-3xl font-bold text-balance md:text-5xl'>
            Comprehensive toolkit for developers
          </h2>
          <p className='text-lg leading-relaxed text-balance text-muted-foreground'>
            Components, hooks, and utilities designed to work seamlessly
            together
          </p>
        </div>

        <div className='mb-12 grid gap-8 md:grid-cols-3'>
          {categories.map((category) => (
            <Card key={category.title} className='relative overflow-hidden'>
              <CardHeader>
                <CardTitle className='text-2xl'>{category.title}</CardTitle>
                <CardDescription className='text-base'>
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className='flex flex-wrap gap-2'>
                {category.items.map((item) => (
                  <Badge
                    key={item}
                    variant='outline'
                    className='font-mono text-xs'
                  >
                    {item}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='flex justify-center'>
          <Button size='lg' variant='outline' asChild>
            <Link href={'/docs' as '/docs/[[...slugs]]'}>
              Browse All Components
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
