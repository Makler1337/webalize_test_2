import { getIntegrations } from '@/lib/payload'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import { IntegrationsFilter } from '@/components/IntegrationsFilter'

export default async function IntegrationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const integrations = await getIntegrations()

  const mapped = integrations.map((i) => ({
    id: i.id,
    name: String(i[`name_${locale}`] ?? i.name_en),
    description: String(i[`description_${locale}`] ?? i.description_en),
    platform: i.platform ?? '',
    logoUrl: i.logo && typeof i.logo === 'object' ? i.logo.url ?? undefined : undefined,
    logoAlt: i.logo && typeof i.logo === 'object' ? i.logo.alt : undefined,
  }))

  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ textAlign: 'center' }}>{dict.integrations.title}</h1>
      <p style={{ textAlign: 'center' }}>{dict.integrations.subtitle}</p>
      <IntegrationsFilter integrations={mapped} locale={locale} />
    </div>
  )
}
