import { Card, CardContent } from '@yuki/ui/card'
import { BlocksIcon, Code2Icon, PaletteIcon, ZapIcon } from '@yuki/ui/icons'

export function FeaturesSection() {
  return (
    <section id='features' className='bg-secondary/20 py-20 md:py-32'>
      <div className='container'>
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <h2 className='mb-4 text-3xl font-bold text-balance md:text-5xl'>
            Everything you need to build faster
          </h2>
          <p className='text-lg leading-relaxed text-balance text-muted-foreground'>
            A complete toolkit for building modern web applications with React
            and Next.js
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent>
                <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
                  <feature.icon className='h-6 w-6 text-primary' />
                </div>
                <h3 className='mb-2 text-lg font-semibold'>{feature.title}</h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: BlocksIcon,
    title: 'Rich Component Library',
    description:
      'Over 50+ production-ready components including forms, navigation, overlays, and data display elements.',
  },
  {
    icon: ZapIcon,
    title: 'Powerful Hooks',
    description:
      'Custom React hooks for common patterns like media queries, local storage, debouncing, and more.',
  },
  {
    icon: PaletteIcon,
    title: 'Fully Customizable',
    description:
      'Built with Tailwind CSS and CSS variables. Easily theme and customize to match your brand.',
  },
  {
    icon: Code2Icon,
    title: 'TypeScript First',
    description:
      'Written in TypeScript with full type definitions for excellent developer experience and autocomplete.',
  },
]
