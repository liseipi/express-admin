import { Request, Response, NextFunction } from 'express'
import Validator from 'validatorjs'
import { getUserByEmail } from './register.service'

Validator.useLang('zh')

export const validateUserData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { email, password } = request.body

  let rules = {
    email: 'required|email',
    password: 'required|min:6'
  }
  let customErrorMessages = {
    'email.required': '邮箱地址不为空.',
    'email.email': '填写正确的邮箱格式.'
  }

  let validation = new Validator({ email, password }, rules, customErrorMessages)
  validation.passes()
  if (Number(validation.errorCount) > 0) {
    let allError = validation.errors.all()
    return response.status(400).send({ message: allError })
    // return next(new Error(JSON.stringify(allError)))
  }

  const user = await getUserByEmail(email)
  if (user) {
    return response.status(409).send({ message: '用户email地址已存在.' })
  }

  next()
}
