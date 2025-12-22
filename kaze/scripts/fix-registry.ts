import fs from 'node:fs/promises'
import path from 'node:path'

async function fixRegistry() {
  const registryPath = path.join(__dirname, '..', 'public', 'r')
  const files = await fs.readdir(registryPath)

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(registryPath, file)
      const content = await fs.readFile(filePath, 'utf-8')
      const updatedContent = content
        .replaceAll(/@\/registry\/ui\/([^'"\s]+)/g, '@/components/ui/$1')
        .replaceAll('@yuki/ui/icons', 'lucide-react')
        .replaceAll(/@yuki\/ui\/([^'"\s]+)/g, '@/components/ui/$1')
        .replaceAll('@yuki/ui', '@/lib/utils')
      await fs.writeFile(filePath, updatedContent, 'utf-8')
    }),
  )
}

await fixRegistry()
  .then(() => {
    console.log('Registry fixed successfully.')
  })
  .catch((error) => {
    console.error('Failed to fix registry:', error)
  })
