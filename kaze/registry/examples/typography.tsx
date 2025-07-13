import { Typography } from '@yuki/ui/typography'

export default function TypographyDemo() {
  const text = 'The quick brown fox jumps over the lazy dog.'

  return (
    <article className='not-prose'>
      <Typography variant='h1'>H1. Heading 1</Typography>
      <Typography variant='h2'>H2. Heading 2</Typography>
      <Typography variant='h3'>H3. Heading 3</Typography>
      <Typography variant='h4'>H4. Heading 4</Typography>
      <Typography variant='h5'>H5. Heading 5</Typography>
      <Typography variant='h6'>H6. Heading 6</Typography>
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
    </article>
  )
}
