'use client'

import { Button } from '@/components/ui/button'
import { ToastProvider, toast } from '@/registry/ui/toast'

export default function ToastDemo() {
  return (
    <ToastProvider>
      <ToastDemoContent />
    </ToastProvider>
  )
}

function ToastDemoContent() {
  const toasts = [
    {
      label: 'Show Simple Toast',
      action: () =>
        toast.add({ title: 'This is a simple toast notification.' }),
    },
    {
      label: 'Show Success Toast',
      action: () =>
        toast.add({ title: 'This is a toast notification!', type: 'success' }),
    },
    {
      label: 'Show Error Toast',
      action: () =>
        toast.add({ title: 'This is a toast notification!', type: 'error' }),
    },
    {
      label: 'Show Info Toast',
      action: () =>
        toast.add({ title: 'This is a toast notification!', type: 'info' }),
    },
    {
      label: 'Show Warning Toast',
      action: () =>
        toast.add({ title: 'This is a toast notification!', type: 'warning' }),
    },
    {
      label: 'Show Promise Toast',
      action: () =>
        toast.promise(
          new Promise((resolve) =>
            setTimeout(() => resolve('Data loaded'), 3000),
          ),
          {
            loading: 'Loading...',
            success: (data) => `Success: ${data}`,
            error: (err) => `Error: ${err}`,
          },
        ),
    },
    {
      label: 'Show Toast with Action',
      action: () =>
        toast.add({
          title: 'Custom Action',
          description: 'This toast has a custom action button.',
          actionProps: {
            children: 'Undo',
            onClick: () => alert('Undo action clicked!'),
          },
        }),
    },
  ]

  return (
    <div className='flex flex-wrap items-center justify-center gap-4'>
      {toasts.map(({ label, action }) => (
        <Button key={label} variant='outline' onClick={action}>
          {label}
        </Button>
      ))}
    </div>
  )
}
