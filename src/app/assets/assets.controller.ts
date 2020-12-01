import { Request, Response, NextFunction } from 'express'
import express from 'express'
import * as service from './assets.service'

const router = express.Router()

router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let data = await service.getAllAssets()

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
    console.log(id)
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

export default router
