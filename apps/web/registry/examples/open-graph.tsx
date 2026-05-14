import Image from 'next/image'

export default function OpenGraphDemo() {
  const title = 'Open Graph Demo'
  const description = 'A simple example demonstrating the Open Graph component.'
  const dsada = [
    {
      name: 'Default',
      title,
      description,
    },
    {
      name: 'With Image',
      title,
      description,
      image:
        'https://1.gravatar.com/avatar/48b8ec4ce6c85e06c11bda4381a3ac6cb8161a23e5ea540544c809063090815d?size=400',
    },
    {
      name: 'Image only',
      image: 'https://tiesen.id.vn/assets/logotype.png',
    },
  ]

  return (
    <ul className='flex w-full flex-col gap-4 p-4'>
      {dsada.map((props) => (
        <li key={props.name}>
          <p className='mb-2 text-lg font-semibold'>{props.name}</p>

          <Image
            src={`/api/og?title=${encodeURIComponent(props.title ?? '')}&description=${encodeURIComponent(props.description ?? '')}&image=${encodeURIComponent(props.image ?? '')}`}
            alt={props.title || 'Open Graph Image'}
            width={1200}
            height={630}
            loading='eager'
            className='border'
          />
        </li>
      ))}
    </ul>
  )
}
