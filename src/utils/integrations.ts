export type Integration = {
  id: number | string
  name: string
  description: string
  platform: string
  logoUrl?: string
  logoAlt?: string
}

export function filterIntegrations(
  items: Integration[],
  search: string,
  platform: string | null,
): Integration[] {
  return items.filter((item) => {
    const matchesSearch = !search || item.name.toLowerCase().includes(search.toLowerCase())
    const matchesPlatform = !platform || item.platform === platform
    return matchesSearch && matchesPlatform
  })
}
