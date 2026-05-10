import type { BaseLayoutProps } from '@fumadocs/base-ui/layouts/shared'

import Image from 'next/image'

import logo from '@/public/icon-512.png'

import { appName, gitConfig } from './shared'

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Image
            src={logo}
            alt={appName}
            className='h-6 w-auto object-cover'
            sizes='(max-width: 768px) 100vw, 120px'
            loading='eager'
          />
          <span className='font-bold'>{appName}</span>
        </>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  }
}
