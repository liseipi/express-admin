import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from '../../config/env'
import { Request, Response, NextFunction } from 'express'
import { validateLoginData } from './login.validate'
import { getUserByEmail } from './login.service'

const router = express.Router()

/**
 * @swagger
 * /login:
 *    post:
 *      tags:
 *        - "个人中心"
 *      summary: 用户登录
 *      description: "登录接口"
 *      produces:
 *        - "application/xml"
 *        - application/json
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "登录数据"
 *        required: true
 *      responses:
 *       200:
 *         description: login
 */
router.post('/', validateLoginData, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body

    //查寻用户是否存在
    let user = await getUserByEmail(email)
    if (!user) {
      return response.status(401).send({ statusCode: 401, message: '帐户不存在!' })
    }

    //对比密码
    const matchedPwd = await bcrypt.compare(password, user.password)
    if (!matchedPwd) {
      return response.status(401).send({ status: 401, message: '密码无效!' })
    }

    // 生成token
    let payload = { id: user.id, email: user.email }
    let token = jwt.sign(payload, `${env.PRIVATE_KEY}`, { algorithm: 'RS256', expiresIn: '1h' })

    return response.status(200).send({ token })

  } catch (error) {
    return next(new Error(error))
  }
})

export default router
