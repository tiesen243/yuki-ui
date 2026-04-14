// oxlint-disable no-img-element

import type { NextRequest } from 'next/server'

import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const appName = 'Yuki UI'
    const title = searchParams.get('title') ?? ''
    const description = searchParams.get('description') ?? ''
    const image = searchParams.get('image') ?? ''
    const logoUrl = `https://yuki-ui.vercel.app/assets/logo.svg`
    const theme = searchParams.get('theme') ?? 'dark'

    const backgroundColor = theme === 'dark' ? '#000000' : '#fafafa'
    const foregroundColor = theme === 'dark' ? '#ffffff' : '#000000'
    const primaryColor = theme === 'dark' ? '#dbe6f6' : '#293478'

    /*
     * Load custom fonts if needed.
     * const [geistRegular, geistMedium, geistBold] = await Promise.all([
     *  _getFont('Geist-Regular', 400),
     *  _getFont('Geist-Medium', 500),
     *  _getFont('Geist-Bold', 700),
     * ])
     */

    return new ImageResponse(
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '32px',

          width: '100%',
          height: '100%',
          padding: '32px 40px',

          backgroundColor,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              width: '48px',
              height: '48px',
              borderRadius: '8px',

              backgroundColor: primaryColor,
            }}
          >
            <img
              src={logoUrl}
              alt='Logo'
              style={{
                width: '80%',
                height: '80%',
                margin: 0,

                objectFit: 'contain',
                filter: theme === 'dark' ? 'none' : 'invert(1)',
              }}
            />
          </div>

          <h1
            style={{
              fontSize: '28px',
              fontWeight: '500',
              color: foregroundColor,
            }}
          >
            {appName}
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',

            flex: 1,
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',

              width: image ? '65%' : '100%',
              height: '100%',
            }}
          >
            <h2
              style={{
                fontSize: '48px',
                lineHeight: '1.1',
                fontWeight: '700',
                color: foregroundColor,

                margin: '0 0 24px 0',
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: '24px',
                lineHeight: '1.2',
                fontWeight: '400',
                color: foregroundColor,

                height: '100%',
                overflow: 'hidden',
                margin: 0,
                opacity: 0.75,
              }}
            >
              {description}
            </p>
          </div>
          {image && (
            <img
              src={image}
              alt={title}
              style={{
                flex: 1,
                border: `0.5px solid ${foregroundColor}`,
                borderRadius: '16px',
                aspectRatio: '1 / 1',
                objectFit: 'cover',
              }}
            />
          )}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <hr
              style={{
                width: '60px',
                height: '4px',
                borderRadius: '2px',

                background: `linear-gradient(90deg, ${primaryColor}, ${backgroundColor})`,
              }}
            />
            <p
              style={{
                fontSize: '16px',
                fontWeight: '500',
                color: foregroundColor,

                margin: 0,
                opacity: 0.75,
              }}
            >
              {new URL(request.url).hostname}
            </p>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        /* Register custom fonts if needed.
         * fonts: [geistRegular, geistMedium, geistBold],
         */
      }
    )
  } catch (error: unknown) {
    console.error(error)
    return new Response(`Failed to generate the image`, { status: 500 })
  }
}

async function _getFont(font: string, weight = 400) {
  const response = await fetch(
    new URL(`../../../public/assets/fonts/${font}.ttf`, import.meta.url)
  )
  return {
    name: font,
    data: await response.arrayBuffer(),
    style: 'normal' as const,
    weight,
  }
}
