import { describe, it, expect } from 'vitest'
import { filterIntegrations, type Integration } from '@/utils/integrations'

const items: Integration[] = [
  { id: 1, name: 'Volvo Trucks', description: 'Volvo integration', platform: 'truck-oems' },
  { id: 2, name: 'Samsara', description: 'Telematics provider', platform: 'telematics' },
  { id: 3, name: 'Oracle TMS', description: 'Transport management', platform: 'tms' },
  { id: 4, name: 'Scania', description: 'Scania truck OEM', platform: 'truck-oems' },
]

describe('filterIntegrations', () => {
  it('returns all items when no filters are active', () => {
    const result = filterIntegrations(items, '', null)
    expect(result).toHaveLength(4)
  })

  it('filters by search term (case-insensitive)', () => {
    const result = filterIntegrations(items, 'volvo', null)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Volvo Trucks')
  })

  it('filters by platform', () => {
    const result = filterIntegrations(items, '', 'truck-oems')
    expect(result).toHaveLength(2)
    expect(result.map((i) => i.name)).toEqual(['Volvo Trucks', 'Scania'])
  })

  it('combines search and platform filter', () => {
    const result = filterIntegrations(items, 'scania', 'truck-oems')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Scania')
  })

  it('returns empty array when nothing matches', () => {
    const result = filterIntegrations(items, 'nonexistent', null)
    expect(result).toHaveLength(0)
  })
})
