/**
 * Replace the first path segment (locale) with the target locale.
 */
export function getLocalePath(pathname: string, targetLocale: string): string {
  const segments = pathname.split('/')
  segments[1] = targetLocale
  return segments.join('/')
}
