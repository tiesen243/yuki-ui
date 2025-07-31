/* eslint-disable @next/next/no-img-element */

import type { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const appName = 'Yuki'
    const title = searchParams.get('title') ?? ''
    const description = searchParams.get('description') ?? ''
    const logoUrl = `https://tiesen.id.vn/assets/images/logo.svg`

    const truncatedTitle = truncateText(title, 80)
    const titleFontSize = getTitleFontSize(truncatedTitle.length)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '32px',
            backgroundColor: '#000',
            backgroundImage:
              'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: '64px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48',
                height: '48',
                backgroundColor: '#fff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={logoUrl}
                alt='Logo'
                style={{
                  width: '80%',
                  height: '80%',
                }}
              />
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: '500',
                color: '#fff',
              }}
            >
              {appName}
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <h1
              style={{
                fontSize: `${titleFontSize}px`,
                fontWeight: '700',
                color: '#fff',
                lineHeight: '1.1',
                margin: '0',
                background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
              }}
            >
              {truncatedTitle}
            </h1>

            <p
              style={{
                fontSize: description.length > 100 ? '24px' : '32px',
                color: '#888',
                lineHeight: '1.5',
                margin: '0',
                fontWeight: '400',
                maxWidth: '800px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #0070f3, #00d9ff)',
                  borderRadius: '2px',
                }}
              />
              <div
                style={{
                  fontSize: '16px',
                  color: '#666',
                  fontWeight: '500',
                }}
              >
                {new URL(request.url).hostname}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#00d9ff',
                  borderRadius: '50%',
                  opacity: 0.8,
                }}
              />
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#0070f3',
                  borderRadius: '50%',
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#7c3aed',
                  borderRadius: '50%',
                  opacity: 0.4,
                }}
              />
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 },
    )
  } catch (e: unknown) {
    console.error(e)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text

  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...'
  }

  return truncated + '...'
}

function getTitleFontSize(titleLength: number): number {
  if (titleLength <= 20) return 72
  if (titleLength <= 40) return 64
  if (titleLength <= 60) return 56
  return 48
}
