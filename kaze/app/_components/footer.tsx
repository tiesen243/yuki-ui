export function Footer() {
  return (
    <footer className='border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex flex-col items-center justify-between gap-4 py-6 md:flex-row'>
        <span className='text-sm text-muted-foreground'>
          &copy; {new Date().getFullYear()} Yuki UI. All rights reserved.
        </span>
        <a
          href='https://tiesen.id.vn'
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-muted-foreground underline-offset-4 hover:underline'
        >
          Built by tiesen243
        </a>
      </div>
    </footer>
  )
}
