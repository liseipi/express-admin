import { Request, Response, NextFunction } from 'express'
import express from 'express'
import { getAbout } from './about.service'

const router = express.Router()

// export const index = (request: Request, response: Response, next: NextFunction) => {
//   response.send('about')
// }

/**
 * @swagger
 * /about:
 *    get:
 *      tags:
 *        - "关于作者"
 *      summary: 关于Oli
 *      description: "获取作者Oli的相关信息 - Api接口测试数据"
 *      produces:
 *       - application/json
 *      responses:
 *        "200":
 *          description: "successful operation"
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
