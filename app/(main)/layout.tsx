import Image from 'next/image'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'

import { source } from '@/content'

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DocsLayout
      tree={source.pageTree}
      githubUrl="https://github.com/tiesen243/yuki-ui"
      links={[
        {
          text: 'Facebook',
          type: 'icon',
          url: 'https://www.facebook.com/tiesen243.nanoda',
          icon: (
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Facebook</title>
              <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
            </svg>
          ),
        },
        {
          text: 'X',
          type: 'icon',
          url: 'https://x.com/tiesen243',
          icon: (
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>X</title>
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          ),
        },
      ]}
      nav={{
        title: (
          <>
            <Image
              src="/logo.svg"
              alt="Yuki UI"
              width={32}
              height={32}
              className="dark:invert"
            />
            <span className="text-xl font-bold">Yuki UI</span>
          </>
        ),
      }}
    >
      {children}
    </DocsLayout>
  )
}
