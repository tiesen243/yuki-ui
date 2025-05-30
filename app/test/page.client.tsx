'use client'

import { Loader2Icon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { useMounted } from '@/registry/hooks/use-mounted'

export const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useTheme()

  const isMouted = useMounted()
  if (!isMouted)
    return Button({ children: <Loader2Icon className="animate-spin" /> })

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }}
    >
      {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}
