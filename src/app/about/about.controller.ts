import { Request, Response, NextFunction } from 'express'
import express from 'express'
import { getAbout } from './about.service'

const router = express.Router()

// export const index = (request: Request, response: Response, next: NextFunction) => {
//   response.send('about')
// }

router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let data = await getAbout()
    response.send(data)
  } catch (error) {
    // return next(new Error())
    return next(error)
  }
})

router.get('/abc', (request: Request, response: Response, next: NextFunction) => {
  response.send({ a: 123 })
})

export default router
