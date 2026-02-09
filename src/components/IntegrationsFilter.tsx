'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n/config'
import { filterIntegrations, type Integration } from '@/utils/integrations'

const platforms = [
  { label: 'Truck OEMs', value: 'truck-oems' },
  { label: 'Telematics', value: 'telematics' },
  { label: 'TMS', value: 'tms' },
]

export function IntegrationsFilter({
  integrations,
  locale,
}: {
  integrations: Integration[]
  locale: Locale
}) {
  const [search, setSearch] = useState('')
  const [activePlatform, setActivePlatform] = useState<string | null>(null)

  const filtered = filterIntegrations(integrations, search, activePlatform)

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search an integration"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', maxWidth: '400px', padding: '8px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
        <button
          onClick={() => setActivePlatform(null)}
          style={{
            padding: '6px 16px',
            border: '1px solid #ccc',
            fontWeight: !activePlatform ? 'bold' : 'normal',
          }}
        >
          All
        </button>
        {platforms.map((p) => (
          <button
            key={p.value}
            onClick={() => setActivePlatform(activePlatform === p.value ? null : p.value)}
            style={{
              padding: '6px 16px',
              border: '1px solid #ccc',
              fontWeight: activePlatform === p.value ? 'bold' : 'normal',
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginTop: '32px',
        }}
      >
        {filtered.map((integration) => (
          <div
            key={integration.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              border: '1px solid #ccc',
            }}
          >
            {integration.logoUrl && (
              <img
                src={integration.logoUrl}
                alt={integration.logoAlt ?? ''}
                style={{ width: '48px', height: '48px', objectFit: 'contain' }}
              />
            )}
            <div>
              <strong>{integration.name}</strong>
              <p style={{ margin: 0 }}>{integration.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '24px' }}>No integrations found.</p>
      )}
    </div>
  )
}
