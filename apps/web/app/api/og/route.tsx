import { ImageResponse } from 'next/og'

import { loadGoogleFont } from '@/app/api/og/_utils'
import { appName } from '@/lib/shared'
import { OpenGraph } from '@/registry/ui/open-graph'

export const revalidate = false

export async function GET(req: Request, _: RouteContext<'/api/og'>) {
  const url = new URL(req.url)

  const title = url.searchParams.get('title') ?? ''
  const description = url.searchParams.get('description') ?? ''
  let image = url.searchParams.get('image') ?? ''
  if (image && !image.startsWith('http'))
    image = new URL(image, req.url).toString()

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
