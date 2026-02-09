import type { Integration as PayloadIntegration } from '@/payload-types'

export type Integration = {
  id: number | string
  name: string
  description: string
  platform: PayloadIntegration['platform']
  logoUrl?: string
  logoAlt?: string
}

export function filterIntegrations(
  items: Integration[],
  search: string,
  platform: PayloadIntegration['platform'] | null,
): Integration[] {
  return items.filter((item) => {
    const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase())
    const matchesPlatform = !platform || item.platform === platform
    return matchesSearch && matchesPlatform
  })
}
