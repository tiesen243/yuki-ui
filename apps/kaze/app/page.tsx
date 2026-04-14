import { HomeLayout } from 'fumadocs-ui/layouts/home'

import { baseOptions } from '@/app/layout.config'
import { ComponentShowcaseSection } from '@/components/home/component-showcase-section'
import { FeaturesSection } from '@/components/home/features-section'
import { Footer } from '@/components/home/footer'
import { HeroSection } from '@/components/home/hero-section'

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className='flex-1'>
        <h1 className='sr-only'>Yuki UI</h1>

        <HeroSection />
        <FeaturesSection />
        <ComponentShowcaseSection />
      </main>

      <Footer />
    </HomeLayout>
  )
}
