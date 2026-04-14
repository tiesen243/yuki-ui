import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export function GET(req: NextRequest) {
  return NextResponse.rewrite(new URL('/docs', req.url))
}
