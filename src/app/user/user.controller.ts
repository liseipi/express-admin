import express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as User from './user.service'

const router = express.Router()

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
    let key = request.query
    let data = await User.getAllUser(key)

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

router.post('/user/add', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { data } = request.body
    let res = await User.userAdd(data)
    return response.send({
      statusCode: 200,
      message: 'ok',
      result: {
        res
      }
    })
  } catch (error) {
    return next(error)
  }
})

router.get('/user/findOne/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let { id } = request.params
    let data = await User.findOne(Number(id))

    return response.send({
      statusCode: 200,
      message: 'ok',
      result: data
    })
  } catch (error) {
    return next(error)
  }
})

router.post('/user/edit/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { data } = request.body
    let { id } = request.params
    let res = await User.userEdit(data, Number(id))
    return response.send({
      statusCode: 200,
      message: 'ok',
      result: {
        res
      }
    })
  } catch (error) {
    return next(error)
  }
})

router.get('/user/destroy/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let { id } = request.params
    let res = await User.destroyUser(Number(id))

    return response.send({
      statusCode: 200,
      message: 'ok',
      result: {
        res
      }
    })
  } catch (error) {
    return next(error)
  }
})

router.get('/user/assets/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let { id } = request.params
    let res = await User.getAssets(Number(id))

    return response.send({
      statusCode: 200,
      message: 'ok',
      result: {
        res
      }
    })
  } catch (error) {
    return next(error)
  }
})

export default router
