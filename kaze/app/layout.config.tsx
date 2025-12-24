import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { GalleryThumbnailsIcon } from '@yuki/ui/icons'
import Image from 'next/image'

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image
          src='/assets/logo.svg'
          alt='Tiesen Logo'
          className='object-cover dark:invert'
          width={32}
          height={32}
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
}
