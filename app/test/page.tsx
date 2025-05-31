import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/registry/ui/alert'
import { Badge } from '@/registry/ui/badge'
import { Button } from '@/registry/ui/button'
import { Typography } from '@/registry/ui/typography'
import { ToggleTheme } from './page.client'

export default function TestPage() {
  return (
    <main className="container flex min-h-dvh flex-col items-center justify-center gap-4">
      <ToggleTheme />
      <div className="grid w-full grid-cols-3 gap-4">
        {(
          [
            'default',
            'success',
            'info',
            'warning',
            'error',
            'destructive',
          ] as const
        ).map((variant) => (
          <Card key={variant}>
            <CardHeader>
              <CardTitle>
                {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant
              </CardTitle>

              <CardDescription>
                This is a {variant} variant card
              </CardDescription>

              <CardAction>
                <Badge variant={variant}>Some Badge</Badge>
              </CardAction>
            </CardHeader>

            <CardContent>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>

              <Alert variant={variant}>
                <AlertTitle>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)} Alert
                </AlertTitle>
                <AlertDescription className="line-clamp-1">
                  This is a {variant} alert. It provides feedback to the user
                </AlertDescription>
              </Alert>
            </CardContent>

            <CardFooter className="justify-end">
              <Button variant={variant}>Lick Me</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
