import { ImageResponse } from 'next/og'

import { appName } from '@/lib/shared'
import { OpenGraph } from '@/registry/ui/open-graph'

export const revalidate = false

async function loadGoogleFont(fontName: string): Promise<ArrayBuffer> {
  const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}&display=swap`

  const response = await fetch(fontUrl)
  const cssText = await response.text()

  const fontFaceMatch = cssText.match(/@font-face\s*{[^}]*}/)
  if (!fontFaceMatch) throw new Error(`Font face not found for ${fontName}`)

  const [fontFace] = fontFaceMatch
  const urlMatch = fontFace.match(/url\(([^)]+)\)/)
  if (!urlMatch) throw new Error(`Font URL not found for ${fontName}`)

  const fontFileUrl = urlMatch[1]?.replaceAll(/['"]/g, '')
  const fontResponse = await fetch(fontFileUrl ?? '')
  return await fontResponse.arrayBuffer()
}

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
