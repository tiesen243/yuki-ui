'use client'

import { Blockquote } from '@tiptap/extension-blockquote'
import { Bold } from '@tiptap/extension-bold'
import { Document } from '@tiptap/extension-document'
import { HardBreak } from '@tiptap/extension-hard-break'
import { Heading } from '@tiptap/extension-heading'
import { Italic } from '@tiptap/extension-italic'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Strike } from '@tiptap/extension-strike'
import { Text } from '@tiptap/extension-text'
import { Underline } from '@tiptap/extension-underline'
import { Dropcursor, Placeholder, UndoRedo } from '@tiptap/extensions'
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
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from 'lucide-react'
import { useMemo } from 'react'

import { cn } from '@/lib/utils'

const TYPOGRAPHY = [
  '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-pretty',
  '[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-pretty',
  '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-pretty',
  '[&_p]:text-balance [&_p]:leading-7',
  '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-2',
  '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-2',
  '[&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-2',
]

interface EditorProps extends Omit<React.ComponentProps<'div'>, 'onBlur'> {
  value: string
  onValueChange: (value: string) => unknown
  onBlur?: (event: FocusEvent) => unknown
  placeholder?: string
  disabled?: boolean
}

function Editor({
  value,
  onValueChange,
  onBlur,
  placeholder = 'Start typing...',
  disabled,
  ...props
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      Blockquote,
      Bold,
      Document,
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              const { state } = this.editor
              const nodeBefore = state.selection.$from.nodeBefore

              if (
                nodeBefore?.type.name !== 'hardBreak' &&
                this.editor.isActive('paragraph') &&
                !(
                  this.editor.isActive('bulletList') ||
                  this.editor.isActive('orderedList')
                )
              )
                return this.editor.commands.setHardBreak()
              return this.editor.chain().createParagraphNear().run()
            },
          }
        },
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Italic,
      BulletList,
      ListItem,
      OrderedList,
      Paragraph,
      Strike,
      Text,
      Underline,
      Dropcursor,
      Placeholder.configure({ placeholder }),
      UndoRedo,
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
        isDisabled: disabled,
      },
      {
        label: 'Heading 2',
        icon: Heading2Icon,
        action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor?.isActive('heading', { level: 2 }),
        isDisabled: disabled,
      },
      {
        label: 'Heading 3',
        icon: Heading3Icon,
        action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: editor?.isActive('heading', { level: 3 }),
        isDisabled: disabled,
      },
      {
        label: 'Bold',
        icon: BoldIcon,
        action: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive('bold'),
        isDisabled: disabled,
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        action: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive('italic'),
        isDisabled: disabled,
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        action: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive('underline'),
        isDisabled: disabled,
      },
      {
        label: 'Strikethrough',
        icon: StrikethroughIcon,
        action: () => editor?.chain().focus().toggleStrike().run(),
        isActive: editor?.isActive('strike'),
        isDisabled: disabled,
      },
      {
        label: 'Blockquote',
        icon: QuoteIcon,
        action: () => editor?.chain().focus().toggleBlockquote().run(),
        isActive: editor?.isActive('blockquote'),
        isDisabled: disabled,
      },
      {
        label: 'Bullet List',
        icon: ListIcon,
        action: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive('bulletList'),
        isDisabled: disabled,
      },
      {
        label: 'Ordered List',
        icon: ListOrderedIcon,
        action: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive('orderedList'),
        isDisabled: disabled,
      },
    ],
    [editor, disabled],
  )

  const rightToolbars = useMemo(
    () => [
      {
        label: 'Undo',
        icon: UndoIcon,
        action: () => editor?.chain().focus().undo().run(),
        isActive: false,
        isDisabled: !editor?.can().chain().undo().run() || disabled,
      },
      {
        label: 'Redo',
        icon: RedoIcon,
        action: () => editor?.chain().focus().redo().run(),
        isActive: false,
        isDisabled: !editor?.can().chain().redo().run() || disabled,
      },
    ],
    [editor, disabled],
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
        {leftToolbars.map(
          ({ label, icon: Icon, action, isActive, isDisabled }) => (
            <ToggleButton
              key={label}
              data-position='start'
              onClick={action}
              isActive={isActive}
              disabled={isDisabled}
            >
              <Icon />
              <span className='sr-only'>Toggle {label}</span>
            </ToggleButton>
          ),
        )}

        <div className='flex-1' />

        {rightToolbars.map(
          ({ label, icon: Icon, action, isActive, isDisabled }) => (
            <ToggleButton
              key={label}
              data-position='end'
              onClick={action}
              isActive={isActive}
              disabled={isDisabled}
            >
              <Icon />
              <span className='sr-only'>Toggle {label}</span>
            </ToggleButton>
          ),
        )}
      </div>

      <EditorContent
        editor={editor}
        className={cn(
          'bg-transparent dark:bg-input/30 aria-disabled:bg-input/80 [&_.ProseMirror]:px-2.5 [&_.ProseMirror]:py-2 [&_.ProseMirror]:text-base [&_.ProseMirror]:md:text-sm [&_.ProseMirror]:field-sizing-content [&_.ProseMirror]:min-h-20 [&_.ProseMirror]:w-full [&_.ProseMirror]:outline-none',
          '[&_p:is(.is-editor-empty):first-child]:before:content-[attr(data-placeholder)] [&_p:is(.is-editor-empty):first-child]:before:text-muted-foreground [&_p:is(.is-editor-empty):first-child]:before:text-sm [&_p:is(.is-editor-empty):first-child]:before:h-0 [&_p:is(.is-editor-empty):first-child]:before:float-left [&_p:is(.is-editor-empty):first-child]:before:pointer-events-none',
          ...TYPOGRAPHY,
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
      className={cn(...TYPOGRAPHY, className)}
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
