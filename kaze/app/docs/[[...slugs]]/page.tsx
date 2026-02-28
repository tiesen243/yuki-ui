import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/ui/icons'
import { createMetadata } from '@/lib/metadata'
import { source } from '@/lib/source'
import { getBaseUrl } from '@/lib/utils'
import { getMDXComponents } from '@/mdx-components'

export default async function DocPage({
  params,
}: PageProps<'/docs/[[...slugs]]'>) {
  const { slugs } = await params
  const page = source.getPage(slugs)
  if (!page) return notFound()

  const MDXContent = page.data.body
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.data.title,
    description: page.data.description,
    url: page.url,
    author: {
      '@type': 'Person',
      name: 'Tiesen',
      url: 'https://tiesen.id.vn',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Yuki UI',
      logo: {
        '@type': 'ImageObject',
        url: `${getBaseUrl()}/favicon.svg`,
      },
    },
    image: `${getBaseUrl()}/api/og?title=${page.data.title}&description=${page.data.description}`,
  }

  return (
    <>
      <script
        type='application/ld+json'
        // oxlint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replaceAll('<', '\\u003c'),
        }}
      />

      <DocsPage
        tableOfContent={{ style: 'clerk' }}
        toc={page.data.toc}
        full={page.data.full}
      >
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className='mb-0'>
          {page.data.description}
        </DocsDescription>
        {page.data.source && (
          <Button
            variant='outline'
            size='sm'
            className='w-fit'
            nativeButton={false}
            render={
              // oxlint-disable-next-line no-html-link-for-pages
              <a
                href={`https://github.com/tiesen243/yuki-ui/blob/main/kaze/registry/${page.data.source}`}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`View source for ${page.data.title} on GitHub`}
              />
            }
          >
            <GithubIcon /> Component Source
          </Button>
        )}
        <DocsBody>
          <MDXContent components={getMDXComponents()} />
        </DocsBody>
      </DocsPage>
    </>
  )
}

export async function generateMetadata({
  params,
}: PageProps<'/docs/[[...slugs]]'>) {
  const { slugs } = await params
  const page = source.getPage(slugs)
  if (!page) return notFound()

  return createMetadata({
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: `/api/og?title=${page.data.title}&description=${page.data.description}`,
      url: page.url,
    },
  })
}

export function generateStaticParams() {
  return source.getPages().map(({ slugs }) => ({ slugs }))
}
