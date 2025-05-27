import { notFound } from 'next/navigation'
import { generateOGImage } from 'fumadocs-ui/og'

import { source } from '@/content'
import { getBaseUrl } from '@/lib/utils'

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const { slug } = await params
  const page = source.getPage(slug.slice(0, -1))
  if (!page) notFound()

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: 'Yuki UI',
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
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
}

export function generateStaticParams() {
  return source.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, 'image.png'],
  }))
}
