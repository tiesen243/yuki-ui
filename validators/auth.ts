import { type } from 'arktype'
import { z } from 'zod'

export const arktypeSignUp = type({
  name: 'string >= 4',
  email: 'string.email',
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  confirmPassword: 'string >= 8',
}).narrow((data, ctx) => {
  if (data.password !== data.confirmPassword)
    return ctx.reject({
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    })
  return true
})

export const zodSignUp = z
  .object({
    name: z.string().min(4, { message: 'Name must be at least 4 characters' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
