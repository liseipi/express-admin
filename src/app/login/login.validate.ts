import { Request, Response, NextFunction } from 'express'
import Validator from 'validatorjs'

Validator.useLang('zh')

export const validateLoginData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body

  let rules = {
    email: 'required|email',
    password: 'required|min:6'
  }

  let validation = new Validator({ email, password }, rules)
  validation.passes()
  if (Number(validation.errorCount) > 0) {
    let allError = validation.errors.all()
    return response.status(400).send({ statusCode: 400, message: allError })
  }

  next()
}
