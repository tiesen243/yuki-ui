import { loader } from 'fumadocs-core/source'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { docs } from '@/.source'

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
})
