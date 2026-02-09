'use client'

import { useState } from 'react'
import { filterIntegrations, type Integration } from '@/utils/integrations'
import Image from 'next/image'

type PlatformOption = {
  label: string
  value: Integration['platform']
}

const platforms: PlatformOption[] = [
  { label: 'Truck OEMs', value: 'truck-oems' },
  { label: 'Telematics', value: 'telematics' },
  { label: 'TMS', value: 'tms' },
]

export function IntegrationsFilter({ integrations }: { integrations: Integration[] }) {
  const [search, setSearch] = useState('')
  const [activePlatform, setActivePlatform] = useState<Integration['platform'] | null>(null)

  const filtered = filterIntegrations(integrations, search, activePlatform)

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search an integration"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
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
        {platforms.map((platform) => (
          <button
            key={platform.value}
            onClick={() =>
              setActivePlatform(activePlatform === platform.value ? null : platform.value)
            }
            style={{
              padding: '6px 16px',
              border: '1px solid #ccc',
              fontWeight: activePlatform === platform.value ? 'bold' : 'normal',
            }}
          >
            {platform.label}
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
              <Image
                src={integration.logoUrl}
                alt={integration.logoAlt ?? ''}
                width={48}
                height={48}
                style={{ objectFit: 'contain' }}
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
