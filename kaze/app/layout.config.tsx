import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Image from 'next/image'

import { GalleryThumbnailsIcon } from '@yuki/ui/icons'

import Tiesen from '@/public/assets/logotype.png'

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <Image
        src={Tiesen}
        alt='Tiesen Logo'
        className='h-12 w-auto object-cover md:h-auto md:w-2/3'
        sizes='(max-width: 768px) 45vw, (max-width: 1200px) 33vw, 20vw'
        priority
      />
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
}
