import express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as User from './user.service'

const router = express.Router()

/**
 * @swagger
 * /getUserInfo:
 *    get:
 *      tags:
 *        - "个人中心"
 *      summary: 获取用户信息
 *      description: "获取用户个人信息"
 *      produces:
 *       - application/json
 *      responses:
 *        "200":
 *          description: "successful operation"
 *
 *
 */
router.get('/getUserInfo', async (request: Request, response: Response, next: NextFunction) => {
  response.send({
    status: 200,
    message: 'ok',
    result: {
      user: request.body.userInfo
    }
  })
})

router.get('/user/getAll', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let data = await User.getAllUser()

    return response.send({
      statusCode: 200,
      message: 'ok',
      result: {
        data
      }
    })
  } catch (error) {
    return next(error)
  }
})

export default router
