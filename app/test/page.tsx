import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/ui/tabs'
import { ToggleTheme } from './page.client'

export default function TestPage() {
  return (
    <main className="container flex min-h-dvh flex-col items-center justify-center gap-4">
      <ToggleTheme />

      {(['default', 'underline', 'border', 'light'] as const).map((variant) => (
        <Tabs key={variant} defaultValue="tab1">
          <TabsList variant={variant} className="w-full">
            <TabsTrigger value="tab1" variant={variant}>
              Tab 1
            </TabsTrigger>
            <TabsTrigger value="tab2" variant={variant}>
              Tab 2
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tab1" asChild>
            <Card>
              <CardContent>
                <p>This is the content of Tab 1.</p>
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tab2" asChild>
            <Card>
              <CardContent>
                <p>Tab 2 content goes here.</p>
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ))}
    </main>
  )
}
