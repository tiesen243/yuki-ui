'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/registry/ui/toast'

export default function ToastDemo() {
  const toasts = [
    {
      label: 'Show Simple Toast',
      action: () => toast.show('This is a simple toast notification.'),
    },
    {
      label: 'Show Success Toast',
      action: () => toast.success('This is a success toast notification!'),
    },
    {
      label: 'Show Error Toast',
      action: () => toast.error('This is a error toast notification!'),
    },
    {
      label: 'Show Info Toast',
      action: () => toast.info('This is a info toast notification!'),
    },
    {
      label: 'Show Warning Toast',
      action: () => toast.warning('This is a warning toast notification!'),
    },
    {
      label: 'Show Promise Toast',
      action: () =>
        toast.promise(
          // oxlint-disable-next-line promise/avoid-new
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0.5) resolve('Data loaded successfully!')
              // oxlint-disable-next-line prefer-promise-reject-errors
              reject('Failed to load data.')
            }, 2000)
          }),
          {
            loading: 'Loading data...',
            success: (data) => data as string,
            error: (error) => error as string,
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
            onClick: () => toast.close(),
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
