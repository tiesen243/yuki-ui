import fs from 'fs'
import path from 'path'
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'

export const ComponentSource: React.FC<{ name: string }> = ({ name }) => {
  try {
    const content = fs.readFileSync(
      path.join(process.cwd(), 'registry', name),
      'utf-8',
    )
    return <DynamicCodeBlock lang="tsx" code={content} />
  } catch {
    return <DynamicCodeBlock lang="tsx" code="Component not found" />
  }
}
