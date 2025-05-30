import Image from 'next/image'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center py-8">
      <Image
        src="/yuki.png"
        alt="Yuki"
        width={300}
        height={300}
        className="mb-8 object-cover"
      />
      <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Oops! Page Not Found
      </h1>
      <p className="mb-8 leading-7 [&:not(:first-child)]:mt-6">
        Looks like this page got lost in cyberspace!
      </p>

      <Link
        href="/"
        className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border px-6 text-sm font-medium whitespace-nowrap shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 has-[>svg]:px-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        Take me home
      </Link>
    </main>
  )
}
