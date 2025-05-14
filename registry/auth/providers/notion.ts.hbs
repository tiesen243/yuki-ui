import { Notion } from 'arctic'

import type { ProviderUserData } from '@/server/auth/providers/base'
import { BaseProvider } from '@/server/auth/providers/base'

interface NotionUserResponse {
  bot: {
    owner: {
      user: {
        id: string
        person: { email: string }
        name: string
        avatar_url: string
      }
    }
  }
}

export class NotionProvider extends BaseProvider {
  protected provider = new Notion(
    process.env.NOTION_CLIENT_ID ?? '',
    process.env.NOTION_CLIENT_SECRET ?? '',
    this.createCallbackUrl('notion'),
  )

  protected readonly API_URL = 'https://api.notion.com/v1/users/me'
  protected readonly DEFAULT_SCOPES = []

  public createAuthorizationURL(
    state: string,
    _codeVerifier: string | null,
  ): URL {
    return this.provider.createAuthorizationURL(state)
  }

  public async fetchUserData(
    code: string,
    _codeVerifier: string | null,
  ): Promise<ProviderUserData> {
    const tokens = await this.provider.validateAuthorizationCode(code)
    const accessToken = tokens.accessToken()

    const response = await fetch(this.API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Notion-Version': '2022-06-28',
      },
    })
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error')
      throw new Error(`Notion API error (${response.status}): ${errorText}`)
    }

    const {
      bot: {
        owner: { user },
      },
    } = (await response.json()) as NotionUserResponse

    return {
      accountId: user.id,
      email: user.person.email,
      name: user.name,
      image: user.avatar_url,
    }
  }
}
