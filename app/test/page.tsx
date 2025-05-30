import { Button } from '@/registry/ui/button'
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
          'ghost',
          'link',
        ] as const
      ).map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </main>
  )
}
