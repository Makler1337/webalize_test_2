import { describe, it, expect } from 'vitest'
import { getLocalePath } from '@/utils/locale'

describe('getLocalePath', () => {
  it('swaps locale in a simple path', () => {
    expect(getLocalePath('/en', 'de')).toBe('/de')
  })

  it('swaps locale in a nested path', () => {
    expect(getLocalePath('/en/contact', 'de')).toBe('/de/contact')
  })

  it('handles deeply nested paths', () => {
    expect(getLocalePath('/en/blog/post/123', 'de')).toBe('/de/blog/post/123')
  })

  it('swaps from de to en', () => {
    expect(getLocalePath('/de/integrations', 'en')).toBe('/en/integrations')
  })
})
