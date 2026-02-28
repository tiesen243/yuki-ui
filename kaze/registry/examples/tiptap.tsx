'use client'

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { useState } from 'react'

import { Editor, RichTextViewer } from '@/registry/ui/tiptap'

export default function TiptapDemo() {
  const [value, setValue] = useState(
    '<h1>Hello, World!</h1><p>This is a rich text editor demo.</p>'
  )

  return (
    <div className='flex w-full flex-col'>
      <Editor value={value} onValueChange={setValue} />

      <Tabs items={['Preview', 'HTML']} defaultValue='preview'>
        <Tab value='Preview'>
          <RichTextViewer content={value} />
        </Tab>
        <Tab value='HTML'>
          <DynamicCodeBlock lang='html' code={value} />
        </Tab>
      </Tabs>
    </div>
  )
}
