import { createFromSource } from 'fumadocs-core/search/server'

import { source } from '@/content'

export const { GET } = createFromSource(source)
