export { cn } from 'cnfast'

export function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin
  if (process.env.APP_URL) return `https://${process.env.APP_URL}`
  return 'http://localhost:3000'
}
