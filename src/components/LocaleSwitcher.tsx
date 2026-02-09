'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { getLocalePath } from '@/utils/locale'

export function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname()

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {locales.map((loc) => (
        <Link
          key={loc}
          href={getLocalePath(pathname, loc)}
          style={{ fontWeight: loc === currentLocale ? 'bold' : 'normal' }}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
