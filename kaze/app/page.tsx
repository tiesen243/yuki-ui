import { HomeLayout } from 'fumadocs-ui/layouts/home'

import { ComponentShowcaseSection } from '@/app/_components/component-showcase-section'
import { FeaturesSection } from '@/app/_components/features-section'
import { Footer } from '@/app/_components/footer'
import { HeroSection } from '@/app/_components/hero-section'
import { baseOptions } from '@/app/layout.config'

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
