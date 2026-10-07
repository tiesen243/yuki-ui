import { AuthSection } from '@/app/(home)/_components/auth'
import { CTASection } from '@/app/(home)/_components/cta'
import { HeroSection } from '@/app/(home)/_components/hero'
import { NativeSection } from '@/app/(home)/_components/native'
import { PlatformSection } from '@/app/(home)/_components/platform'
import { PrinciplesSection } from '@/app/(home)/_components/principles'
import { ShowcaseSection } from '@/app/(home)/_components/showcase'
import { WorkflowSection } from '@/app/(home)/_components/workflow'

export default function Page() {
  return (
    <main className='flex flex-col gap-6'>
      <h1 className='sr-only'>Yuki UI</h1>

      <HeroSection />

      <PrinciplesSection />

      <ShowcaseSection />

      <PlatformSection />

      <AuthSection />

      <NativeSection />

      <WorkflowSection />

      <CTASection />
    </main>
  )
}
