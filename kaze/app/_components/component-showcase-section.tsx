import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const categories = [
  {
    title: 'Components',
    description: 'UI building blocks',
    items: ['Nvim Statusline', 'Open Graph Image', 'Typography'],
  },
  {
    title: 'Hooks',
    description: 'React utilities',
    items: ['useDebounce', 'useForm'],
  },
  {
    title: 'Utilities',
    description: 'Helper functions',
    items: ['createEnv()', 'createId()'],
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
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
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
          <Button
            size='lg'
            variant='outline'
            nativeButton={false}
            render={
              <Link
                href={'/docs' as '/docs/[[...slugs]]'}
                araia-label={'Browse All Components'}
              />
            }
          >
            Browse All Components <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </section>
  )
}
