'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname()

  function getLocalePath(targetLocale: string) {
    // Replace the current locale segment with the target locale
    const segments = pathname.split('/')
    segments[1] = targetLocale
    return segments.join('/')
  }

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {locales.map((loc) => (
        <Link
          key={loc}
          href={getLocalePath(loc)}
          style={{ fontWeight: loc === currentLocale ? 'bold' : 'normal' }}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
