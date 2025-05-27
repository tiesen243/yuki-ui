import { NextResponse } from 'next/server'
import { Feed } from 'feed'

import { source } from '@/content'
import { getBaseUrl } from '@/lib/utils'

export const revalidate = false

export function GET() {
  const feed = new Feed({
    title: 'Yuki UI',
    id: `${getBaseUrl()}/blog`,
    link: `${getBaseUrl()}/blog`,
    language: 'en',

    image: `${getBaseUrl()}/tiesen-v2.png`,
    favicon: `${getBaseUrl()}/logo.png`,
    copyright: 'All rights reserved 2025, Tiesen',
  })

  for (const page of source.getPages().sort((a, b) => {
    return (
      new Date(b.data.lastModified ?? '').getTime() -
      new Date(a.data.lastModified ?? '').getTime()
    )
  })) {
    feed.addItem({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      link: `${getBaseUrl()}${page.url}`,
      date: new Date(page.data.lastModified ?? ''),

      author: [
        {
          name: 'Tiesen',
          email: 'ttien56906@gmail.com',
          link: 'https://tiesen.id.vn',
          avatar:
            'https://gravatar.com/avatar/48b8ec4ce6c85e06c11bda4381a3ac6cb8161a23e5ea540544c809063090815d',
        },
      ],
    })
  }

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
