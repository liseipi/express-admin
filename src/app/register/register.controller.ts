import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { validateUserData } from './register.validate'

const router = express.Router()

router.post('/', validateUserData, (request: Request, response: Response, next: NextFunction) => {
  response.send({ a: 123 })
})

export default router
