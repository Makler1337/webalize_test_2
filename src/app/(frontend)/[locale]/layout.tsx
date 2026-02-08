import React from 'react'
import Link from 'next/link'
import { getDictionary } from '@/i18n/dictionaries'
import { locales, type Locale } from '@/i18n/config'
import { ContactModal } from '@/components/ContactModal'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'

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
        <div style={{ marginLeft: 'auto' }}>
          <LocaleSwitcher currentLocale={locale} />
        </div>
      </nav>
      {children}
    </div>
  )
}
