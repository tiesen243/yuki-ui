import Script from 'next/script'

export default function PlaygroundLayout({
  children,
}: LayoutProps<'/playground'>) {
  return (
    <>
      <Script
        id='react-scan'
        crossOrigin='anonymous'
        src='//unpkg.com/react-scan/dist/auto.global.js'
      />

      {children}
    </>
  )
}
