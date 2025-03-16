import { remarkInstall } from 'fumadocs-docgen'
import { defineConfig, defineDocs } from 'fumadocs-mdx/config'

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {},
  meta: {},
})

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkInstall],
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-default',
      },
    },
  },
})
