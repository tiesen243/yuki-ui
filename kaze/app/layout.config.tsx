import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Image from 'next/image'

import { GalleryThumbnailsIcon } from '@yuki/ui/icons'

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image
          src='/assets/logo.svg'
          alt='Tiesen Logo'
          className='object-cover dark:invert'
          width={24}
          height={24}
          priority
        />
        <span className='text-xl font-bold'>Yuki UI</span>
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
}
