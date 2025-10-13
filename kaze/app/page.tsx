import { ComponentShowcaseSection } from '@/app/_components/component-showcase-section'
import { FeaturesSection } from '@/app/_components/features-section'
import { Footer } from '@/app/_components/footer'
import { Header } from '@/app/_components/header'
import { HeroSection } from '@/app/_components/hero-section'

export default function HomePage() {
  return (
    <>
      <Header />

      <main className='flex-1'>
        <h1 className='sr-only'>Yuki UI</h1>

        <HeroSection />
        <FeaturesSection />
        <ComponentShowcaseSection />
      </main>

      <Footer />
    </>
  )
}
