import { Request, Response, NextFunction } from 'express'
import express from 'express'
import * as service from './monitor.service'

const router = express.Router()

router.get('/getAll', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let key = request.query
    let data = await service.getAllMonitor(key)

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

router.get('/details/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let { id } = request.params
    let data = await service.getDetails(parseInt(id))

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

router.post('/add', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { data } = request.body
    if (data.hasOwnProperty('status')) {
      data.status = data.status ? 0 : 1
    }
    data.createdAt = Math.floor(Date.now() / 1000)
    data.updatedAt = Math.floor(Date.now() / 1000)

    let res = await service.add(data)
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

router.post('/update/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let { id } = request.params
    const { data } = request.body
    if (data.hasOwnProperty('status')) {
      data.status = data.status ? 0 : 1
    }
    data.updatedAt = Math.floor(Date.now() / 1000)

    let MonitorInfo: any = await service.update(Number(id), data)

    return response.send({
      statusCode: 200,
      message: 'ok',
      result: { MonitorInfo }
    })
  } catch (error) {
    return next(error)
  }
})

export default router
