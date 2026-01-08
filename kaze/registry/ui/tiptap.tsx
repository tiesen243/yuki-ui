'use client'

import { Blockquote } from '@tiptap/extension-blockquote'
import { Bold } from '@tiptap/extension-bold'
import { Document } from '@tiptap/extension-document'
import { Heading } from '@tiptap/extension-heading'
import { Italic } from '@tiptap/extension-italic'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Strike } from '@tiptap/extension-strike'
import { Text } from '@tiptap/extension-text'
import { Underline } from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import {
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react'
import { useMemo } from 'react'

import { cn } from '@/lib/utils'

interface EditorProps extends Omit<React.ComponentProps<'div'>, 'onBlur'> {
  value: string
  onValueChange: (value: string) => unknown
  onBlur?: (event: FocusEvent) => unknown
  disabled?: boolean
}

function Editor({
  value,
  onValueChange,
  onBlur,
  disabled,
  ...props
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      Blockquote,
      Bold,
      Document,
      Heading.configure({ levels: [1, 2, 3] }),
      Italic,
      BulletList,
      ListItem,
      OrderedList,
      Paragraph,
      Strike,
      Text,
      Underline,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => !disabled && onValueChange(editor.getHTML()),
    onBlur: ({ event }) => onBlur?.(event),
  })

  const leftToolbars = useMemo(
    () => [
      {
        label: 'Heading 1',
        icon: Heading1Icon,
        action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: editor?.isActive('heading', { level: 1 }),
      },
      {
        label: 'Heading 2',
        icon: Heading2Icon,
        action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor?.isActive('heading', { level: 2 }),
      },
      {
        label: 'Heading 3',
        icon: Heading3Icon,
        action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: editor?.isActive('heading', { level: 3 }),
      },
      {
        label: 'Bold',
        icon: BoldIcon,
        action: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive('bold'),
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        action: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive('italic'),
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        action: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive('underline'),
      },
      {
        label: 'Strikethrough',
        icon: StrikethroughIcon,
        action: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive('strike'),
      },
      {
        label: 'Blockquote',
        icon: QuoteIcon,
        action: () => editor?.chain().focus().toggleBlockquote().run(),
        isActive: editor?.isActive('blockquote'),
      },
    ],
    [editor],
  )

  const rightToolbars = useMemo(
    () => [
      {
        label: 'Bullet List',
        icon: ListIcon,
        action: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive('bulletList'),
      },
      {
        label: 'Ordered List',
        icon: ListOrderedIcon,
        action: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive('orderedList'),
      },
    ],
    [editor],
  )

  if (!editor) return null

  return (
    <div
      {...props}
      data-slot='editor'
      role='textbox'
      className={cn(
        'group/editor border border-input rounded-lg transition-colors',
        'aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50',
        'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed',
      )}
      aria-disabled={disabled}
    >
      <div
        className={cn(
          'w-full flex items-stretch bg-popover border-b border-border rounded-t-lg',
        )}
      >
        {leftToolbars.map(({ label, icon: Icon, action, isActive }) => (
          <ToggleButton
            key={label}
            data-position='start'
            onClick={action}
            isActive={isActive}
          >
            <Icon />
            <span className='sr-only'>Toggle {label}</span>
          </ToggleButton>
        ))}

        <div className='flex-1' />

        {rightToolbars.map(({ label, icon: Icon, action }) => (
          <ToggleButton
            key={label}
            data-position='end'
            onClick={action}
            isActive={false}
          >
            <Icon />
            <span className='sr-only'>Toggle {label}</span>
          </ToggleButton>
        ))}
      </div>

      <EditorContent
        editor={editor}
        className={cn(
          'bg-transparent dark:bg-input/30 aria-disabled:bg-input/80 [&_.ProseMirror]:px-2.5 [&_.ProseMirror]:py-2 [&_.ProseMirror]:text-base [&_.ProseMirror]:md:text-sm [&_.ProseMirror]:field-sizing-content [&_.ProseMirror]:min-h-20 [&_.ProseMirror]:w-full [&_.ProseMirror]:outline-none',
          '[&_h1]:text-2xl [&_h1]:font-bold',
          '[&_h2]:text-xl [&_h2]:font-semibold',
          '[&_h3]:text-lg [&_h3]:font-semibold',
          '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2',
          '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2',
          '[&_blockquote]:border-l [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-2',
        )}
        aria-disabled={disabled}
      />
    </div>
  )
}

function RichTextViewer({
  content,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  content: string
}) {
  return (
    <div
      {...props}
      data-slot='rich-text-viewer'
      className={cn(
        '[&_h1]:text-2xl [&_h1]:font-bold',
        '[&_h2]:text-xl [&_h2]:font-semibold',
        '[&_h3]:text-lg [&_h3]:font-semibold',
        '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2',
        '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

function ToggleButton({
  className,
  isActive,
  ...props
}: React.ComponentProps<'button'> & {
  isActive?: boolean
}) {
  return (
    <button
      type='button'
      data-slot='editor-toggle-button'
      data-active={isActive ? 'true' : 'false'}
      className={cn(
        'size-8 hover:bg-input dark:hover:bg-input/50 inline-flex items-center justify-center text-sm font-medium first:rounded-tl-lg last:rounded-tr-lg data-[position=start]:border-r data-[position=end]:border-l border-input [&_svg:not([class*="size-"])]:size-4 data-[active=true]:bg-input dark:data-[active=true]:bg-input/50',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className,
      )}
      {...props}
    />
  )
}

export { Editor, RichTextViewer }
