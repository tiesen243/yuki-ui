import { notFound } from 'next/navigation'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'

import { Button } from '@yuki/ui/button'
import { GithubIcon } from '@yuki/ui/icons'

import { createMetadata } from '@/lib/metadata'
import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'

export default async function DocPage({
  params,
}: Readonly<{ params: Promise<{ slugs: string[] }> }>) {
  const { slugs } = await params
  const page = source.getPage(slugs)
  if (!page) return notFound()

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      {page.slugs.length > 1 && (
        <Button variant='outline' size='sm' className='w-fit' asChild>
          <a
            href={`https://github.com/tiesen243/yuki-ui/blob/main/kaze/registry/ui/${page.slugs.at(-1)}.tsx`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <GithubIcon />
            Component Source
          </a>
        </Button>
      )}
      <DocsBody>
        <page.data.body components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ slugs: string[] }> }>) {
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
