import { Button } from '@yuki/ui/button'
import { BookOpenIcon, GithubIcon } from '@yuki/ui/icons'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className='sticky inset-0 z-50 flex h-14 items-center border-b bg-popover/60 text-popover-foreground backdrop-blur-xl backdrop-saturate-150'>
      <div className='container flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/assets/logo.svg'
            alt='Yuki UI Logo'
            className='object-cover dark:invert'
            width={32}
            height={32}
            priority
          />
          <span className='text-lg font-bold'>Yuki UI</span>
        </Link>

        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            nativeButton={false}
            render={
              <a
                href='https://github.com/tiesen243/yuki-ui'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub Repository'
              />
            }
          >
            <GithubIcon />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            nativeButton={false}
            render={<Link href={'/docs' as '/docs/[[...slugs]]'} />}
          >
            <BookOpenIcon />
          </Button>
        </div>
      </div>
    </header>
  )
}
