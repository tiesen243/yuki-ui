import type { MDXComponents } from 'mdx/types'
import { Suspense, useMemo } from 'react'
import { Callout } from 'fumadocs-ui/components/callout'
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import defaultMdxComponents from 'fumadocs-ui/mdx'

import { Index } from './__registry__'
import { getBaseUrl } from './lib/utils'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    Step,
    Steps,
    Tab,
    Tabs,
    InstallComponent,
    PreviewComponent,
    ComponentSource,
  }
}

interface Props {
  comp: string
}

function InstallComponent({ comp }: Props) {
  const url = `${getBaseUrl()}/r/${comp}.json`

  return (
    <Tabs items={['npm', 'yarn', 'pnpm', 'bun']}>
      <Tab value="npm">
        <DynamicCodeBlock lang="sh" code={`npx shadcn add ${url}`} />
      </Tab>
      <Tab value="yarn">
        <DynamicCodeBlock lang="sh" code={`npx shadcn add ${url}`} />
      </Tab>
      <Tab value="pnpm">
        <DynamicCodeBlock lang="sh" code={`pnpm dlx shadcn add ${url}`} />
      </Tab>
      <Tab value="bun">
        <DynamicCodeBlock lang="sh" code={`bunx --bun shadcn add ${url}`} />
      </Tab>
    </Tabs>
  )
}

function ComponentSource({ comp }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const code = String(Index[comp].files[0].content)
  if (code === 'undefined')
    return <Callout type="error">Source code not available</Callout>
  return <DynamicCodeBlock lang="tsx" code={code} />
}

function PreviewComponent({ comp }: Props) {
  const Comp = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const Component = Index[comp]?.component
    return <Component />
  }, [comp])

  return (
    <div className="not-prose flex items-center justify-center">
      <Suspense
        fallback={
          <div className="bg-muted h-96 w-full animate-pulse rounded-md" />
        }
      >
        {Comp}
      </Suspense>
    </div>
  )
}
