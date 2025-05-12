/* eslint-disable @next/next/no-img-element */
import { generateOGImage } from 'fumadocs-ui/og'

import { metadataImage } from '@/lib/metadata'
import { getBaseUrl } from '@/lib/utils'

export const GET = metadataImage.createAPI((page) => {
  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: 'Yuki UI',
    icon: (
      <img
        src={`${getBaseUrl()}/logo.svg`}
        alt="logo"
        width={64}
        style={{
          filter: 'invert(1)',
        }}
      />
    ),
    primaryColor: '#a96249',
    primaryTextColor: '#fafafa',
  })
})
