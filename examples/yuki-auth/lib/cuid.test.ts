import { createId } from '@/lib/cuid'
import { describe, it } from 'node:test'
import * as assert from 'node:assert/strict'

describe('cuid', () => {
  it('should create a valid cuid', () => {
    const id = createId()
    assert.ok(
      /^c[0-9a-z]{23}$/.test(id),
      `Generated ID ${id} is not a valid cuid`,
    )
  })

  it('should create unique cuids', () => {
    const ids = new Set<string>()
    for (let i = 0; i < 1000; i++) ids.add(createId())
    assert.strictEqual(ids.size, 1000, 'Generated cuids are not unique')
  })
})
