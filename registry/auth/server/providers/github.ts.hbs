import { GitHub } from 'arctic'

import type { ProviderUserData } from '@/server/auth/providers/base'
import { BaseProvider } from '@/server/auth/providers/base'

interface GithubUserResponse {
  id: string
  email: string
  name: string
  avatar_url: string
}

export class GithubProvider extends BaseProvider {
  protected provider = new GitHub(
    process.env.GITHUB_CLIENT_ID ?? '',
    process.env.GITHUB_CLIENT_SECRET ?? '',
    this.createCallbackUrl('github'),
  )

  protected readonly API_URL = 'https://api.github.com/user'
  protected readonly SCOPES = ['user:email']

  public createAuthorizationURL(
    state: string,
    _codeVerifier: string | null,
  ): URL {
    return this.provider.createAuthorizationURL(state, this.SCOPES)
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
      throw new Error(`Github API error (${response.status}): ${errorText}`)
    }

    const user = (await response.json()) as GithubUserResponse

    return {
      accountId: user.id,
      email: user.email,
      name: user.name,
      image: user.avatar_url,
    }
  }
}
