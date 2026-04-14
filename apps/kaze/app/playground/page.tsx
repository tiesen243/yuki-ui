'use client'

import { useState } from 'react'

import { Editor, EditorInput, EditorPreview } from '@/registry/ui/editor'

export default function PlaygroundPage() {
  const [value, setValue] = useState(`# Hello, World!

This is a **markdown** editor built with [Marked](https://marked.js.org/).
  
## Features
- **Bold**, *Italic*, ~~Strikethrough~~, and more text formatting options.
- Support for headings, lists, blockquotes, and other markdown elements.
- Real-time preview of your markdown content.

## Usage
Start typing in the left pane, and see the rendered markdown in the right pane. Happy writing!`)

  return (
    <main className='container pt-4'>
      <Editor value={value} onValueChange={setValue}>
        <EditorInput />
        <EditorPreview />
      </Editor>
    </main>
  )
}
