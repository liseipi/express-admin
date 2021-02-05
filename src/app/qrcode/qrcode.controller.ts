import express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as Path from './qrcode.service'
import * as service from '../qrcode/qrcode.service'

const router = express.Router()

router.get('/desktop/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let { id } = request.params
    let data = await service.getDesktop(parseInt(id))

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

router.get('/monitor/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let { id } = request.params
    let data = await service.getMonitor(parseInt(id))

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

router.get('/other/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let { id } = request.params
    let data = await service.getOther(parseInt(id))

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
