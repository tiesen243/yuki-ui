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
      <div className="flex min-h-40 w-full flex-col">
        <ChangeModeButtons />
        <NvimStatuslineContent />
      </div>
    </NvimStatuslineProvider>
  )
}

function NvimStatuslineContent() {
  const { mode } = useNvimStatusline()

  return (
    <NvimStatusline>
      <NvimStatuslineSectionA className="font-bold">
        {mode.toUpperCase()}
      </NvimStatuslineSectionA>
      <NvimStatuslineSectionB>
        <GitBranchIcon /> main
      </NvimStatuslineSectionB>
      <NvimStatuslineSectionC>~/app/page.tsx</NvimStatuslineSectionC>
      <NvimStatuslineSectionX>+15</NvimStatuslineSectionX>
      <NvimStatuslineSectionY>1:1</NvimStatuslineSectionY>
      <NvimStatuslineSectionZ className="font-bold">
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
    <div className="container flex flex-1 flex-wrap items-center gap-4 py-6">
      {modes.map((mode) => (
        <Button
          key={mode}
          variant="outline"
          style={{
            color: `var(--${mode})`,
          }}
          size="sm"
          onClick={() => {
            setMode(mode)
          }}
        >
          {mode.toUpperCase()}
        </Button>
      ))}
    </div>
  )
}
