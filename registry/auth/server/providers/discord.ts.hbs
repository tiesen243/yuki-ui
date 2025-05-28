import { Discord } from 'arctic'

import type { ProviderUserData } from '@/server/auth/providers/base'
import { BaseProvider } from '@/server/auth/providers/base'

interface DiscordUserResponse {
  id: string
  email: string
  username: string
  avatar: string
}

export class DiscordProvider extends BaseProvider {
  protected provider = new Discord(
    process.env.DISCORD_CLIENT_ID ?? '',
    process.env.DISCORD_CLIENT_SECRET ?? '',
    this.createCallbackUrl('discord'),
  )

  protected readonly API_URL = 'https://discord.com/api/users/@me'
  protected readonly SCOPES = ['identify', 'email']

  public createAuthorizationURL(
    state: string,
    codeVerifier: string | null,
  ): URL {
    return this.provider.createAuthorizationURL(
      state,
      codeVerifier,
      this.SCOPES,
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
      throw new Error(`Discord API error (${response.status}): ${errorText}`)
    }

    const user = (await response.json()) as DiscordUserResponse

    return {
      accountId: user.id,
      email: user.email,
      name: user.username,
      image: `https://cdn.discordapp.com/embed/avatars/${user.id}/${user.avatar}.png`,
    }
  }
}
