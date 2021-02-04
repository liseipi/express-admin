import express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as Path from './dashboard.service'

const router = express.Router()

router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let desktop = await Path.getDesktop()
    let monitor = await Path.getMonitor()
    let other = await Path.getOther()
    return response.send({
      statusCode: 200,
      message: 'ok',
      result: {
        desktop,
        monitor,
        other
      }
    })
  } catch (error) {
    return next(error)
  }
})

export default router
