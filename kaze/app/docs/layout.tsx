import { DocsLayout as FumaDocsLayout } from 'fumadocs-ui/layouts/docs'

import { baseOptions } from '@/app/layout.config'
import { source } from '@/lib/source'

export default function DocsLayout({ children }: LayoutProps<'/docs'>) {
  return (
    <FumaDocsLayout tree={source.pageTree} {...baseOptions}>
      {children}
    </FumaDocsLayout>
  )
}
