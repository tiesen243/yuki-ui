'use client'

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Editor } from '@/registry/ui/tiptap'

export default function TiptapDemo() {
  const [value, setValue] = useState('<p>Hello World!</p>')

  return (
    <div className='flex flex-col w-full'>
      <Editor value={value} onValueChange={setValue} />

      <Tabs items={['Preview', 'HTML']} defaultValue='preview'>
        <Tab
          value='Preview'
          className={cn(
            '[&_h1]:text-2xl [&_h1]:font-bold',
            '[&_h2]:text-xl [&_h2]:font-semibold',
            '[&_h3]:text-lg [&_h3]:font-semibold',
            '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2',
            '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2',
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </Tab>
        <Tab value='HTML'>
          <DynamicCodeBlock lang='html' code={value} />
        </Tab>
      </Tabs>
    </div>
  )
}
