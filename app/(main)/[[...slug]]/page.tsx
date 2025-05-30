import { notFound } from 'next/navigation'
import Link from 'fumadocs-core/link'
import { Callout } from 'fumadocs-ui/components/callout'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page'

import { ComponentSource } from '@/components/component-source'
import { Install } from '@/components/install'
import { source } from '@/content'
import { createMetadata } from '@/lib/metadata'
import { Button } from '@/registry/ui/button'

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params

  const page = source.getPage(slug)
  if (!page) return notFound()

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            Button,
            Callout,
            ComponentSource,
            Install,
            Link,
            Step,
            Steps,
            Tab,
            Tabs,
          }}
        />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await props.params
  const page = source.getPage(slug)
  if (!page) notFound()

  const image = ['/api/og', ...(slug ?? []), 'image.png'].join('/')

  return createMetadata({
    title: slug ? page.data.title : '',
    description: page.data.description,
    openGraph: {
      images: { url: image, alt: page.data.title },
      url: page.url,
    },
  })
}
