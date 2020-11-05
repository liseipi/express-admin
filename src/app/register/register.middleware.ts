import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'

export const hashPasswrod = async (request: Request, response: Response, next: NextFunction) => {
  const { password } = request.body
  request.body.password = await bcrypt.hash(password, 10)

  next()
}
