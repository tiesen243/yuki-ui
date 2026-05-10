import { DocsLayout } from '@fumadocs/base-ui/layouts/notebook'

import { Header } from '@/layouts/notebook/slots/header'
import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      slots={{ header: Header }}
    >
      {children}
    </DocsLayout>
  )
}
