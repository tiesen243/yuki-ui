import type { Metadata } from 'next'

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import { notFound } from 'next/navigation'

import { getMDXComponents } from '@/components/mdx'
import { createMetadata } from '@/lib/metadata'
import { gitConfig } from '@/lib/shared'
import { getPageImage, getPageMarkdownUrl, source } from '@/lib/source'
import { getBaseUrl } from '@/lib/utils'

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const Mdx = page.data.body
  const markdownUrl = getPageMarkdownUrl(page).url

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
    image: getPageImage(page).url,
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
        toc={page.data.toc}
        full={page.data.full}
        tableOfContent={{ style: 'clerk' }}
      >
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className='mb-0'>
          {page.data.description}
        </DocsDescription>
        <div className='flex flex-row items-center gap-2 border-b pb-6'>
          <MarkdownCopyButton markdownUrl={markdownUrl} />
          <ViewOptionsPopover
            markdownUrl={markdownUrl}
            githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/apps/web/content/docs/${page.path}`}
          />
        </div>
        <DocsBody>
          <Mdx
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>
): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return createMetadata({
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  })
}
