import { Spotify } from 'arctic'

import type { ProviderUserData } from '@/server/auth/providers/base'
import { BaseProvider } from '@/server/auth/providers/base'

interface SpotifyUserResponse {
  id: string
  email: string
  display_name: string
  images: { height: number; url: string; width: number }[]
}

export class SpotifyProvider extends BaseProvider {
  protected provider = new Spotify(
    process.env.SPOTIFY_CLIENT_ID ?? '',
    process.env.SPOTIFY_CLIENT_SECRET ?? '',
    this.createCallbackUrl('spotify'),
  )

  protected readonly API_URL = 'https://api.spotify.com/v1/me'
  protected readonly DEFAULT_SCOPES = ['user-read-email', 'user-read-private']

  public createAuthorizationURL(
    state: string,
    codeVerifier: string | null,
  ): URL {
    return this.provider.createAuthorizationURL(
      state,
      codeVerifier,
      this.DEFAULT_SCOPES,
    )
  }

  public async fetchUserData(
    code: string,
    codeVerifier: string | null,
  ): Promise<ProviderUserData> {
    const tokens = await this.provider.validateAuthorizationCode(
      code,
      codeVerifier,
    )
    const accessToken = tokens.accessToken()

    const response = await fetch(this.API_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      throw new Error(`Spotify API error (${response.status}): ${errorText}`)
    }

    const user = (await response.json()) as SpotifyUserResponse

    return {
      accountId: user.id,
      email: user.email,
      name: user.display_name,
      image: user.images.at(0)?.url ?? '',
    }
  }

  protected createCallbackUrl(provider: string) {
    let baseUrl = `http://[::1]:${process.env.PORT ?? 3000}`
    if (typeof window !== 'undefined') baseUrl = window.location.origin
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
      baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    if (process.env.VERCEL_URL) baseUrl = `https://${process.env.VERCEL_URL}`

    return `${baseUrl}/api/auth/${provider}/callback`
  }
}
