import { TerminalIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/registry/ui/alert'
import { ToggleTheme } from './page.client'

export default function TestPage() {
  return (
    <main className="container flex min-h-dvh flex-col items-center justify-center gap-4">
      <ToggleTheme />

      {(['default', 'destructive', 'success', 'info', 'warning'] as const).map(
        (variant) => (
          <Alert key={variant} variant={variant}>
            <TerminalIcon />
            <AlertTitle>Alert Title</AlertTitle>
            <AlertDescription>
              This is an alert description. It provides additional information
              about the alert.
            </AlertDescription>
          </Alert>
        ),
      )}
    </main>
  )
}
