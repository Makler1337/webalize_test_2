import React from 'react'
import Link from 'next/link'
import { getDictionary } from '@/i18n/dictionaries'
import { locales, type Locale } from '@/i18n/config'
import { ContactModal } from '@/components/ContactModal'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <div>
      <nav style={{ display: 'flex', gap: '16px', padding: '16px', borderBottom: '1px solid #ccc', alignItems: 'center' }}>
        <Link href={`/${locale}`}>{dict.nav.home}</Link>
        <Link href={`/${locale}/news`}>{dict.nav.news}</Link>
        <Link href={`/${locale}/faq`}>{dict.nav.faq}</Link>
        <Link href={`/${locale}/integrations`}>{dict.nav.integrations}</Link>
        <ContactModal dict={dict.contact} />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          {locales.map((loc) => (
            <Link key={loc} href={`/${loc}`} style={{ fontWeight: loc === locale ? 'bold' : 'normal' }}>
              {loc.toUpperCase()}
            </Link>
          ))}
        </div>
      </nav>
      {children}
    </div>
  )
}
