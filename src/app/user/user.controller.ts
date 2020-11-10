import express from 'express'
import jwt from 'jsonwebtoken'
import env from '../../config/env'
import { Request, Response, NextFunction } from 'express'

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
router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  response.send({
    message: 'ok',
    result: request.body.userInfo
  })
})

export default router
