import { Request, Response, NextFunction } from 'express'

export const validateUserData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body

  if (!email) return next(new Error('EMAIL_IS_NOLL'))
  if (!password) return next(new Error('PASSWORD_IS_NOLL'))

  next()
}
