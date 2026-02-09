import { describe, it, expect } from 'vitest'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

describe('getDictionary', () => {
  it('returns English dictionary for "en"', () => {
    const dict = getDictionary('en')
    expect(dict.nav.home).toBe('Home')
    expect(dict.contact.title).toBe('Book a Call')
  })

  it('returns German dictionary for "de"', () => {
    const dict = getDictionary('de')
    expect(dict.nav.home).toBe('Startseite')
    expect(dict.contact.title).toBe('Anruf buchen')
  })

  it('falls back to English for unknown locale', () => {
    const dict = getDictionary('fr' as Locale)
    expect(dict.nav.home).toBe('Home')
  })

  it('returns expected top-level keys', () => {
    const dict = getDictionary('en')
    expect(Object.keys(dict)).toEqual(
      expect.arrayContaining(['nav', 'news', 'faq', 'integrations', 'contact']),
    )
  })
})
