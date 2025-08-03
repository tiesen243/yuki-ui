'use client'

import { useTheme } from 'next-themes'

import { Avatar, AvatarFallback, AvatarImage } from '@yuki/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@yuki/ui/dropdown-menu'
import {
  BellIcon,
  CreditCardIcon,
  LaptopIcon,
  LogOutIcon,
  MoonIcon,
  ShieldIcon,
  SunIcon,
  SunMoonIcon,
  UserIcon,
} from '@yuki/ui/icons'

export default function UserButton() {
  const { theme, setTheme } = useTheme()

  const user = {
    name: 'Tiesen',
    email: 'yuki@example.con',
    image: 'https://github.com/tiesen243.png',
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='size-9 cursor-pointer'>
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <span className='sr-only'>Open user menu</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='min-w-60'>
        <DropdownMenuLabel className='flex flex-col'>
          <p className='text-sm font-medium'>{user.name}</p>
          <p className='text-xs text-muted-foreground'>{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {userNavItems.map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <a href={item.href}>
                <item.icon /> {item.label}
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              </a>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground">
              <SunMoonIcon /> Apperance
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className={
                    theme === 'light'
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }
                  onClick={() => {
                    setTheme('light')
                  }}
                >
                  <SunIcon /> Light mode
                  <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    theme === 'dark'
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }
                  onClick={() => {
                    setTheme('dark')
                  }}
                >
                  <MoonIcon /> Dark mode
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    theme === 'system'
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }
                  onClick={() => {
                    setTheme('system')
                  }}
                >
                  <LaptopIcon /> System
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogOutIcon /> Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const userNavItems = [
  {
    href: '/account/profile',
    label: 'Profile',
    icon: UserIcon,
    shortcut: '⌘P',
  },
  {
    href: '/account/billing',
    label: 'Billing',
    icon: CreditCardIcon,
    shortcut: '⌘B',
  },
  {
    href: '/account/notifications',
    label: 'Notifications',
    icon: BellIcon,
    shortcut: '⌘N',
  },
  {
    href: '/account/security',
    label: 'Security',
    icon: ShieldIcon,
    shortcut: '⌘⇧S',
  },
]
