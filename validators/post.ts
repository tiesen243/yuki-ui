import { type } from 'arktype'

export const createPost = type({
  title: 'string > 5',
  content: 'string',
})
