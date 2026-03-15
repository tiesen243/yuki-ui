'use client'

import { marked } from 'marked'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface EditorContextValue {
  value: string
  onValueChange: (value: string) => unknown
}

const EditorContext = React.createContext<EditorContextValue | null>(null)

const useEditor = () => {
  const context = React.useContext(EditorContext)
  if (!context)
    throw new Error('useEditor must be used within an EditorProvider')
  return context
}

const parseMarkdown = (content: string) => {
  try {
    return marked(content, { breaks: true })
  } catch (error) {
    if (process.env.NODE_ENV === 'development')
      console.error('Error parsing content:', error)
    return 'Error parsing content'
  }
}

function Editor({
  className,
  value,
  onValueChange,
  ...props
}: React.ComponentProps<'div'> & EditorContextValue) {
  const contextValue = React.useMemo(
    () => ({ value, onValueChange }),
    [value, onValueChange]
  )

  return (
    <EditorContext value={contextValue}>
      <div
        data-slot='editor'
        className={cn(
          'group/editor grid min-w-0 grid-cols-2 divide-x divide-input rounded-md border border-input bg-transparent has-only:grid-cols-1 dark:bg-input/30',
          'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
          'data-invalid:divide-destructive data-invalid:border-destructive data-invalid:ring-3 data-invalid:ring-destructive/20 dark:data-invalid:divide-destructive/50 dark:data-invalid:border-destructive/50 dark:data-invalid:ring-destructive/40',
          className
        )}
        {...props}
      />
    </EditorContext>
  )
}

function EditorInput({ className, ...props }: React.ComponentProps<'div'>) {
  const { value, onValueChange } = useEditor()

  return (
    <div
      data-slot='editor-input'
      className={cn('flex flex-col', className)}
      {...props}
    >
      <p className='border-b px-2.5 py-2 font-medium group-data-invalid/editor:border-destructive dark:group-data-invalid/editor:border-destructive/50'>
        Editor
      </p>

      <textarea
        data-slot='editor-input-textarea'
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className='flex field-sizing-content h-full min-h-20 w-full px-2.5 py-2 outline-none'
      />
    </div>
  )
}

function EditorPreview({ className, ...props }: React.ComponentProps<'div'>) {
  const { value } = useEditor()

  const parsedContent = React.useMemo(() => parseMarkdown(value), [value])

  return (
    <div
      data-slot='editor-preview'
      className={cn('flex flex-col', className)}
      {...props}
    >
      <p className='border-b px-2.5 py-2 font-medium group-data-invalid/editor:border-destructive dark:group-data-invalid/editor:border-destructive/50'>
        Preview
      </p>

      <div
        data-slot='editor-preview-content'
        className={cn(
          'px-2.5 py-2',
          '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-pretty',
          '[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-pretty',
          '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-pretty',
          '[&_p]:leading-7 [&_p]:text-balance',
          '[&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6',
          '[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6',
          '[&_blockquote]:my-2 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic',
          '[&_code]:relative [&_code]:w-fit [&_code]:rounded-sm [&_code]:border [&_code]:border-accent [&_code]:bg-accent/40 [&_code]:px-[0.3rem] [&_code]:py-[0.2rem] [&_code]:font-mono [&_code]:text-sm [&_code]:font-medium [&_code]:text-accent-foreground',
          '[&_table]:my-6 [&_table]:w-full [&_table]:overflow-y-auto',
          '[&_tr]:m-0 [&_tr]:border-t [&_tr]:p-0',
          '[&_th]:border [&_th]:bg-muted [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold',
          '[&_td]:border [&_td]:px-4 [&_td]:py-2 [&_td]:text-left'
        )}
        // oxlint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
    </div>
  )
}

export { Editor, EditorInput, EditorPreview, parseMarkdown as parseContent }
