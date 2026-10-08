import '@/globals.css'

import { DefaultTheme, ThemeProvider, Tabs } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { MoonIcon, SunIcon } from 'lucide-uniwind'
import { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Uniwind, useCSSVariable, useUniwind } from 'uniwind'

import { useGeistFonts } from '@/hooks/use-geist-font'
import { Button } from '@/registry/native/button'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontLoaded, fontError] = useGeistFonts()
  const { theme: colorscheme } = useUniwind()
  const [
    backgroundColor,
    foregroundColor,
    primaryColor,
    cardColor,
    popoverColor,
    borderColor,
  ] = useCSSVariable([
    '--color-background',
    '--color-foreground',
    '--color-primary',
    '--color-card',
    '--color-popover',
    '--color-border',
  ]) as [string, string, string, string, string, string]

  useEffect(() => {
    void (async () => {
      if (!fontLoaded && fontError) return

      await SplashScreen.hideAsync()
    })()
  }, [fontLoaded, fontError])

  return (
    <ThemeProvider
      value={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: backgroundColor,
          text: foregroundColor,
          primary: primaryColor,
          card: cardColor,
          notification: popoverColor,
          border: borderColor,
        },
        dark: colorscheme === 'dark',
      }}
    >
      <SafeAreaProvider>
        <Tabs
          screenOptions={{
            headerRight: () => (
              <Button
                size='icon'
                variant='outline'
                className='mr-4'
                onPress={() =>
                  Uniwind.setTheme(colorscheme === 'dark' ? 'light' : 'dark')
                }
              >
                {colorscheme === 'dark' ? (
                  <MoonIcon size={16} className='text-foreground' />
                ) : (
                  <SunIcon size={16} className='text-foreground' />
                )}
              </Button>
            ),
          }}
        >
          <Tabs.Screen name='index' options={{ title: 'Home' }} />
          <Tabs.Screen name='expo-ui' options={{ title: 'Expo UI' }} />
        </Tabs>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
