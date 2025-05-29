'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
    >
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}
