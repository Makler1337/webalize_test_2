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
  const integrations = await getIntegrations(locale)

  const missingTranslation = locale === 'de' ? 'fehlende Übersetzung' : 'missing translation'

  const mapped = integrations.map((integration) => ({
    id: integration.id,
    name: integration.name ?? missingTranslation,
    description: integration.description ?? missingTranslation,
    platform: integration.platform,
    logoUrl:
      integration.logo && typeof integration.logo === 'object'
        ? (integration.logo.url ?? undefined)
        : undefined,
    logoAlt:
      integration.logo && typeof integration.logo === 'object' ? integration.logo.alt : undefined,
  }))

  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ textAlign: 'center' }}>{dict.integrations.title}</h1>
      <p style={{ textAlign: 'center' }}>{dict.integrations.subtitle}</p>
      <IntegrationsFilter integrations={mapped} />
    </div>
  )
}
