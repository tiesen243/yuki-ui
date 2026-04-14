'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/registry/ui/toast'

export default function ToastDemo() {
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
          // oxlint-disable-next-line promise/avoid-new
          new Promise((resolve) =>
            // oxlint-disable-next-line no-promise-executor-return
            setTimeout(() => resolve('Data loaded'), 3000)
          ),
          {
            loading: 'Loading data...',
            success: (data) => `Success: ${data}`,
            error: (err) => `Error: ${err}`,
          }
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
            // oxlint-disable-next-line no-alert
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
