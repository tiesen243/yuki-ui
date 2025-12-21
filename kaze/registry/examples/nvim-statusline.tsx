'use client'

import { Button } from '@yuki/ui/button'
import { GitBranchIcon } from '@yuki/ui/icons'

import {
  NvimStatusline,
  NvimStatuslineProvider,
  NvimStatuslineSectionA,
  NvimStatuslineSectionB,
  NvimStatuslineSectionC,
  NvimStatuslineSectionX,
  NvimStatuslineSectionY,
  NvimStatuslineSectionZ,
  useNvimStatusline,
} from '@/registry/ui/nvim-statusline'

export default function NvimStatuslineDemo() {
  return (
    <NvimStatuslineProvider>
      <ChangeModeButtons />
      <div className='flex-1' />
      <NvimStatuslineContent />
    </NvimStatuslineProvider>
  )
}

function NvimStatuslineContent() {
  const { mode } = useNvimStatusline()

  return (
    <NvimStatusline>
      <NvimStatuslineSectionA>{mode.toUpperCase()}</NvimStatuslineSectionA>
      <NvimStatuslineSectionB>
        <GitBranchIcon /> main
      </NvimStatuslineSectionB>
      <NvimStatuslineSectionC>~/app/page.tsx</NvimStatuslineSectionC>
      <NvimStatuslineSectionX>+15</NvimStatuslineSectionX>
      <NvimStatuslineSectionY>Top 1:1</NvimStatuslineSectionY>
      <NvimStatuslineSectionZ>
        {new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        })}
      </NvimStatuslineSectionZ>
    </NvimStatusline>
  )
}

function ChangeModeButtons() {
  const { modes, setMode } = useNvimStatusline()

  return (
    <div className='container flex flex-wrap items-center gap-4 py-6'>
      {modes.map((mode) => (
        <Button
          key={mode}
          variant='outline'
          style={{ color: `var(--${mode})` }}
          size='sm'
          onClick={() => setMode(mode)}
        >
          {mode.toUpperCase()}
        </Button>
      ))}
    </div>
  )
}
