import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { GalleryThumbnailsIcon } from 'lucide-react'
import Image from 'next/image'

export const baseOptions = (): BaseLayoutProps => ({
  nav: {
    title: (
      <>
        <Image
          src='/favicon.svg'
          alt='Tiesen Logo'
          className='object-cover'
          width={28}
          height={28}
          priority
        />
        <span className='text-lg font-bold'>Yuki UI</span>
      </>
    ),
  },
  githubUrl: 'https://github.com/tiesen243/yuki-ui',
  links: [
    {
      icon: <GalleryThumbnailsIcon />,
      type: 'icon',
      text: 'Portfolio',
      url: 'https://tiesen.id.vn',
    },
  ],
})
