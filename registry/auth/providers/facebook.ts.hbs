import { Facebook } from 'arctic'

import { BaseProvider } from './base'

export class FacebookProvider extends BaseProvider {
  protected provider = new Facebook(
    process.env.FACEBOOK_CLIENT_ID ?? '',
    process.env.FACEBOOK_CLIENT_SECRET ?? '',
    this.createCallbackUrl('facebook'),
  )

  protected readonly API_URL = 'https://graph.facebook.com/me'
  protected readonly DEFAULT_SCOPES = ['email', 'public_profile']

  public createAuthorizationURL(state: string, _codeVerifier: string | null) {
    return this.provider.createAuthorizationURL(state, this.DEFAULT_SCOPES)
  }

  public async fetchUserData(
    code: string,
    _codeVerifier: string | null,
  ): Promise<{
    providerAccountId: string
    name: string
    email: string
    image: string
  }> {
    const tokens = await this.provider.validateAuthorizationCode(code)
    const accessToken = tokens.accessToken()

    const searchParams = new URLSearchParams()
    searchParams.set('access_token', accessToken)
    searchParams.set('fields', ['id', 'name', 'picture', 'email'].join(','))
    const response = await fetch(`${this.API_URL}?${searchParams.toString()}`)
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      throw new Error(`Facebook API error (${response.status}): ${errorText}`)
    }

    const user = (await response.json()) as FacebookUserResponse
    console.log(user)

    return {
      providerAccountId: user.id,
      name: user.name,
      email: user.email,
      image: user.picture.data.url,
    }
  }
}

interface FacebookUserResponse {
  id: string
  name: string
  email: string
  picture: { data: { url: string } }
}
