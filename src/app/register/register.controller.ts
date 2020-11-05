import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { validateUserData } from './register.validate'
import { hashPasswrod } from './register.middleware'
import { createUser } from './register.service'

const router = express.Router()

router.post('/', validateUserData, hashPasswrod, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body
    let newUser = await createUser({ email, password, createdAt: (new Date()).valueOf(), updatedAt: (new Date()).valueOf() })
    response.status(201).send({message: '注册成功.', result: newUser})
  } catch (error) {
    return next(new Error(error))
  }
})

export default router
