import { type } from 'arktype'

export const signUp = type({
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
