import { Typography } from '@/registry/ui/typography'

export default function TypographyDemo() {
  const text = 'The quick brown fox jumps over the lazy dog.'

  return (
    <article className='flex w-full flex-col'>
      <Typography variant='h1'>H1. Heading 1</Typography>
      <Typography variant='h2'>H2. Heading 2</Typography>
      <Typography variant='h3'>H3. Heading 3</Typography>
      <Typography variant='h4'>H4. Heading 4</Typography>
      <Typography>{text}</Typography>
      <Typography variant='blockquote'>{text}</Typography>
      <Typography variant='code'>{text}</Typography>
      <Typography variant='ul'>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </Typography>
      <Typography variant='ol'>
        <li>Ordered item 1</li>
        <li>Ordered item 2</li>
        <li>Ordered item 3</li>
      </Typography>

      <figure>
        {/* oxlint-disable-next-line next/no-img-element */}
        <img
          src='https://images.unsplash.com/photo-1700199849610-dd069b1719c2?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='demonstration of typography styles'
          className='mx-auto w-1/2 rounded-md object-cover'
        />
        <Typography variant='caption' render={<figcaption />}>
          Figure 1. A sample image demonstrating typography styles.
        </Typography>
      </figure>
    </article>
  )
}
