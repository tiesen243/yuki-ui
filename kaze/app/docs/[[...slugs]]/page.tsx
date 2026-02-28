import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'
import { GithubIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { createMetadata } from '@/lib/metadata'
import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

export default async function DocPage({
  params,
}: PageProps<'/docs/[[...slugs]]'>) {
  const { slugs } = await params
  const page = source.getPage(slugs)
  if (!page) return notFound()

  const Body = page.data.body

  return (
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
        <Body components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
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
