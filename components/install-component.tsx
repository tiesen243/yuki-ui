import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'

import { getBaseUrl } from '@/lib/utils'

export const InstallComponent: React.FC<{ name: string }> = ({ name }) => {
  const code = `shadcn@latest add ${getBaseUrl()}/r/${name}.json`

  return (
    <Tabs items={['npm', 'yarn', 'pnpm', 'bun']}>
      <Tab value="npm">
        <DynamicCodeBlock lang="bash" code={`npx ${code}`} />
      </Tab>

      <Tab value="yarn">
        <DynamicCodeBlock lang="bash" code={`npx ${code}`} />
      </Tab>

      <Tab value="pnpm">
        <DynamicCodeBlock lang="bash" code={`pnpm dlx ${code}`} />
      </Tab>

      <Tab value="bun">
        <DynamicCodeBlock lang="bash" code={`bunx --bun ${code}`} />
      </Tab>
    </Tabs>
  )
}
