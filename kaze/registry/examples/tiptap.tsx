'use client'

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { useState } from 'react'

import { Editor, RichTextViewer } from '@/registry/ui/tiptap'

export default function TiptapDemo() {
  const [value, setValue] = useState('')

  return (
    <div className='flex flex-col w-full'>
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
