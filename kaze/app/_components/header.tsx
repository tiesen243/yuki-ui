import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { BookOpenIcon, GithubIcon } from '@yuki/ui/icons'

export function Header() {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src='/assets/logo.svg'
            alt='Yuki UI Logo'
            width={32}
            height={32}
            className='dark:invert'
          />
          <span className='text-lg font-bold'>Yuki UI</span>
        </Link>

        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' asChild>
            <a
              href='https://github.com/tiesen243/yuki-ui'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='GitHub'
            >
              <GithubIcon />
            </a>
          </Button>
          <Button variant='ghost' size='icon' asChild>
            <Link
              href={'/docs' as '/docs/[[...slugs]]'}
              aria-label='Documentation'
            >
              <BookOpenIcon />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
