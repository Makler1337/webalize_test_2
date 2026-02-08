import Link from 'next/link'
import { getIntegrations } from '@/lib/payload'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

export default async function IntegrationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const integrations = await getIntegrations()

  // Group integrations by category
  const grouped = integrations.reduce(
    (acc, integration) => {
      const category = integration.category || 'General'
      if (!acc[category]) acc[category] = []
      acc[category].push(integration)
      return acc
    },
    {} as Record<string, typeof integrations>,
  )

  return (
    <div style={{ padding: '32px' }}>
      <h1>{dict.integrations.title}</h1>
      <p>{dict.integrations.subtitle}</p>
      {Object.keys(grouped).length === 0 && (
        <p>No integrations yet. Create some in the <Link href="/admin">admin panel</Link>.</p>
      )}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '32px' }}>
          <h2>{category}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {items.map((integration) => (
              <div key={integration.id} style={{ padding: '16px', border: '1px solid #ddd' }}>
                {integration.logo && typeof integration.logo === 'object' && (
                  <p>[Logo: {integration.logo.alt}]</p>
                )}
                <h3>{String(integration[`name_${locale}`] ?? integration.name_en)}</h3>
                <p>{String(integration[`description_${locale}`] ?? integration.description_en)}</p>
                {integration.link && (
                  <a href={integration.link} target="_blank" rel="noopener noreferrer">
                    Learn more →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
