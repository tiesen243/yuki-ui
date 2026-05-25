import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/registry/ui/skeleton'
import { Typography } from '@/registry/ui/typography'

export default function SkeletonDemo() {
  return (
    <section className='grid gap-4 sm:grid-cols-2'>
      <ul>
        <li className='mb-4 flex items-center gap-2'>
          <Skeleton variant='circular' className='size-9' />

          <div className='flex flex-col gap-1'>
            <Typography variant='small' className='w-24'>
              <Skeleton variant='text' />
            </Typography>
            <Typography variant='small' className='w-16'>
              <Skeleton variant='text' />
            </Typography>
          </div>
        </li>

        {(['h1', 'h2', 'h3', 'h4', 'p'] as const).map((variant) => (
          <li key={variant} className='flex items-start gap-2'>
            <Typography variant={variant} className='w-24'>
              <Skeleton variant='text' />
            </Typography>

            <Typography variant={variant}>{variant}</Typography>
          </li>
        ))}
      </ul>

      <Card className='h-fit w-75'>
        <CardHeader>
          <CardTitle className='w-2/3'>
            <Skeleton variant='text' />
          </CardTitle>
          <CardDescription className='w-3/4'>
            <Skeleton variant='text' />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton variant='rectangular' className='h-40' />
        </CardContent>
      </Card>
    </section>
  )
}
