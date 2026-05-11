import { ImageResponse } from 'next/og'

import { loadGoogleFont } from '@/app/api/og/_utils'
import { appName } from '@/lib/shared'
import { OpenGraph } from '@/registry/ui/open-graph'

export const revalidate = false

export async function GET(req: Request) {
  const url = new URL(req.url)

  const { searchParams } = url
  const title = searchParams.get('title') ?? 'Default Title'
  const description = searchParams.get('description') ?? 'Default Description'
  const image = searchParams.get('image') ?? undefined

  const fontData = await loadGoogleFont('Geist')
  const logoUrl = new URL('/icon-512.png', req.url).toString()

  return new ImageResponse(
    <OpenGraph
      appName={appName}
      title={title}
      description={description}
      image={image}
      // oxlint-disable-next-line jsx-a11y/alt-text, next/no-img-element
      logo={<img src={logoUrl} width={56} height={56} />}
      caption={url.hostname}
    />,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  )
}
