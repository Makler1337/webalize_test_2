import Link from 'next/link'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)

  return (
    <div style={{ padding: '32px' }}>
      <h1>Webalize</h1>
      <p>Locale: {locale}</p>
      <ul>
        <li><Link href={`/${locale}/news`}>{dict.nav.news}</Link></li>
        <li><Link href={`/${locale}/faq`}>{dict.nav.faq}</Link></li>
        <li><Link href={`/${locale}/integrations`}>{dict.nav.integrations}</Link></li>
      </ul>
      <p><Link href="/admin">Admin Panel</Link></p>
    </div>
  )
}
