import { generateOGImage } from '@fumadocs/base-ui/og'
import { notFound } from 'next/navigation'

import { appName } from '@/lib/shared'
import { getPageImage, source } from '@/lib/source'

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

export async function GET(
  req: Request,
  { params }: RouteContext<'/api/og/docs/[...slug]'>
) {
  const { slug } = await params
  const page = source.getPage(slug.slice(0, -1))
  if (!page) notFound()

  const fontData = await loadGoogleFont('Geist')
  const logoUrl = new URL('/icon-512.png', req.url).toString()

  return generateOGImage({
    site: appName,
    title: page.data.title,
    description: page.data.description,
    // oxlint-disable-next-line nextjs/no-img-element
    icon: <img src={logoUrl} alt='Author Avatar' width={64} height={64} />,
    primaryColor: '#14185a',
    primaryTextColor: '#3f5ec2',
    fonts: [
      {
        name: 'Geist',
        data: fontData,
        weight: 400,
        style: 'normal',
      },
    ],
  })
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }))
}
