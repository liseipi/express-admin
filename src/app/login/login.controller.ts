import express from 'express'
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import { validateLoginData } from './login.validate'
import { hashPasswrod } from './login.middleware'
import { getUserByEmail } from './login.service'

const router = express.Router()

router.post('/', validateLoginData, hashPasswrod, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body
    // let newUser = await createUser({ email, password, createdAt: (new Date()).valueOf(), updatedAt: (new Date()).valueOf() })
    // response.status(201).send({ message: '注册成功.', result: newUser })

    //查寻用户是否存在
    let user = await getUserByEmail(email)
    console.log(user)
    // console.log(Array.isArray(user) && user.email)
    if (!user) {
      return response.status(401).send({ statusCode: 401, message: '帐户不存在!' })
    }
    let aa = JSON.parse(JSON.stringify(user))
    console.log(aa.password)
    console.log(aa.email)
    //对比密码
    // const isPasswordValid = bcrypt.compareSync(
    //   password,
    //   user.password
    // )
    // if (!isPasswordValid) {
    //   return res.status(401).send({
    //     status: 401,
    //     message: '密码无效!'
    //   })
    // }


  } catch (error) {
    return next(new Error(error))
  }
})

export default router
