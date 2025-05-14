import { Figma } from 'arctic'

import type { ProviderUserData } from '@/server/auth/providers/base'
import { BaseProvider } from '@/server/auth/providers/base'

interface FigmaUserResponse {
  id: string
  email: string
  handle: string
  img_url: string
}

export class FigmaProvider extends BaseProvider {
  protected provider = new Figma(
    process.env.FIGMA_CLIENT_ID ?? '',
    process.env.FIGMA_CLIENT_SECRET ?? '',
    this.createCallbackUrl('figma'),
  )

  protected readonly API_URL = 'https://api.figma.com/v1/me'
  protected readonly DEFAULT_SCOPES = ['current_user:read']

  public createAuthorizationURL(
    state: string,
    _codeVerifier: string | null,
  ): URL {
    return this.provider.createAuthorizationURL(state, this.DEFAULT_SCOPES)
  }

  public async fetchUserData(
    code: string,
    _codeVerifier: string | null,
  ): Promise<ProviderUserData> {
    const tokens = await this.provider.validateAuthorizationCode(code)
    const accessToken = tokens.accessToken()

    const response = await fetch(this.API_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      throw new Error(`Google API error (${response.status}): ${errorText}`)
    }

    const user = (await response.json()) as FigmaUserResponse

    return {
      accountId: user.id,
      email: user.email,
      name: user.handle,
      image: user.img_url,
    }
  }
}
