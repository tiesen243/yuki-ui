import { MicrosoftEntraId } from 'arctic'

import type { ProviderUserData } from '@/server/auth/providers/base'
import { BaseProvider } from '@/server/auth/providers/base'

interface MicrosoftUserResponse {
  sub: string
  givenname: string
  familyname: string
  email: string
  picture: string // Microsoft return blob image URL, so, i have no idea how to handle it
}

export class MicrosoftProvider extends BaseProvider {
  protected provider = new MicrosoftEntraId(
    'common',
    process.env.MICROSOFT_CLIENT_ID ?? '',
    process.env.MICROSOFT_CLIENT_SECRET ?? '',
    this.createCallbackUrl('microsoft'),
  )

  protected readonly API_URL = 'https://graph.microsoft.com/oidc/userinfo'
  protected readonly SCOPES = ['openid', 'profile', 'email']

  public createAuthorizationURL(
    state: string,
    codeVerifier: string | null,
  ): URL {
    return this.provider.createAuthorizationURL(
      state,
      codeVerifier ?? '',
      this.SCOPES,
    )
  }

  public async fetchUserData(
    code: string,
    codeVerifier: string | null,
  ): Promise<ProviderUserData> {
    const tokens = await this.provider.validateAuthorizationCode(
      code,
      codeVerifier ?? '',
    )
    const accessToken = tokens.accessToken()

    const response = await fetch(this.API_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      throw new Error(`Microsoft API error (${response.status}): ${errorText}`)
    }

    const user = (await response.json()) as MicrosoftUserResponse

    return {
      accountId: user.sub,
      email: user.email,
      name: `${user.givenname} ${user.familyname}`.trim(),
      image: '',
    }
  }
}
