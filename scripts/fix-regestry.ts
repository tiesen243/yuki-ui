import fs from 'fs/promises'
import path from 'path'

const main = async () => {
  console.log('fixing regestry')

  const files = await fs.readdir(path.resolve(__dirname, '../public/r'))
  for (const file of files) {
    const content = await fs.readFile(
      path.resolve(__dirname, `../public/r/${file}`),
      'utf-8',
    )
    const newContent = content.replace(/@\/registry\/ui/g, '@/registry/ui/ui')
    await fs.writeFile(
      path.resolve(__dirname, `../public/r/${file}`),
      newContent,
    )
  }

  console.log('fixing regestry done')
}

main().catch(console.error)
