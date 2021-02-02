import express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as Path from './path.service'

const router = express.Router()

router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let position = await Path.getPosition()
    let attribution = await Path.getAttribution()
    let branch = await Path.getBranch()
    let department = await Path.getDepartment()
    return response.send({
      statusCode: 200,
      message: 'ok',
      result: {
        position,
        attribution,
        branch,
        department
      }
    })
  } catch (error) {
    return next(error)
  }
})

export default router
