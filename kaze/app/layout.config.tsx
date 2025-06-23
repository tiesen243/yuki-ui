import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import Image from 'next/image'

import Tiesen from '@/public/assets/tiesen.png'

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <Image
        src={Tiesen}
        alt="Tiesen Logo"
        className="w-2/3 object-cover"
        sizes="(max-width: 768px) 45vw, (max-width: 1200px) 33vw, 20vw"
      />
    ),
  },
  githubUrl: 'https://github.com/tiesen243/yuki-ui',
}
