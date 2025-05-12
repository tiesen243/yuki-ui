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
import { InstallComponent } from '@/components/install-component'
import { Button } from '@/components/ui/button'
import { source } from '@/content'
import { createMetadata } from '@/lib/metadata'

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
            InstallComponent,
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

  return createMetadata(slug ?? [], {
    title: slug ? page.data.title : '',
    description: page.data.description,
    openGraph: {
      url: page.url,
    },
  })
}
