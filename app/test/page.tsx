import { HomeIcon } from 'lucide-react'

import { Badge } from '@/registry/ui/badge'
import { ToggleTheme } from './page.client'

export default function TestPage() {
  return (
    <main className="container flex min-h-dvh flex-col items-center justify-center gap-4">
      <ToggleTheme />

      {(
        [
          'default',
          'secondary',
          'success',
          'info',
          'warning',
          'destructive',
          'outline',
        ] as const
      ).map((variant) => (
        <Badge key={variant} variant={variant} size="lg" rounded="full">
          <HomeIcon />
          {variant}
        </Badge>
      ))}
    </main>
  )
}
