import { Typography } from '@/registry/ui/typography'
import { ToggleTheme } from './page.client'

export default function TestPage() {
  return (
    <main className="container flex min-h-dvh flex-col items-center justify-center gap-4">
      <ToggleTheme />
      {(
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote', 'code'] as const
      ).map((variant) => (
        <Typography key={variant} variant={variant} className="w-full">
          The lazy dog jumped over the quick brown fox.
        </Typography>
      ))}
    </main>
  )
}
