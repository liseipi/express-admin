import { Request, Response, NextFunction } from 'express'
import express from 'express'
import { getAbout } from './about.service'

const router = express.Router()

// export const index = (request: Request, response: Response, next: NextFunction) => {
//   response.send('about')
// }

/**
 * @swagger
 * /about
 *  get:
 *      tags:
 *        - aaa
 *
 */
router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let data = await getAbout()
    response.send({
      author: "Oli Liu",
      email: "reg_user@qq.com",
      age: 18
    })
  } catch (error) {
    // return next(new Error())
    return next(error)
  }
})

export default router
