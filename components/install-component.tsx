import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'

export const InstallComponent: React.FC<{ name: string }> = ({ name }) => {
  const code = `shadcn@latest add https://yuki-ui.vercel.app/r/${name}`

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
