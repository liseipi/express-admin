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

router.get('/getAllNull', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let key = request.query
    let data = await service.getAllMonitorNull()

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
      data.status = Number(data.status)
    }
    data.createdAt = Math.floor(Date.now() / 1000)
    data.updatedAt = Math.floor(Date.now() / 1000)

    let res: any = await service.add(data)

    // 记录用户资产日志
    if (data.user_id) {
      let saveData = {
        monitor_id: Number(res.insertId),
        user_id: Number(data.user_id),
        start_time: Math.floor(Date.now() / 1000)
      }
      await service.saveLog(saveData)
    }

    return response.send({
      statusCode: 200,
      message: 'ok',
      result: {
        res
      }
    })
  } catch (error) {
    return response.send({
      statusCode: 202,
      message: error.message,
      result: null
    })
  }
})

router.post('/update/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let { id } = request.params
    const { data } = request.body
    let oldUserId = data.old_user_id
    delete data.old_user_id

    if (data.hasOwnProperty('status')) {
      data.status = Number(data.status)
    }
    data.updatedAt = Math.floor(Date.now() / 1000)

    let MonitorInfo: any = await service.update(Number(id), data)

    // 记录用户资产日志
    if (data.user_id != oldUserId) {
      if (oldUserId) {
        let endTime = Math.floor(Date.now() / 1000)
        await service.saveLogEnd(Number(id), oldUserId, endTime)
      }
      let saveData = {
        monitor_id: Number(id),
        user_id: Number(data.user_id),
        start_time: Math.floor(Date.now() / 1000)
      }
      await service.saveLog(saveData)
    }

    return response.send({
      statusCode: 200,
      message: 'ok',
      result: { MonitorInfo }
    })
  } catch (error) {
    return response.send({
      statusCode: 202,
      message: error.message,
      result: null
    })
  }
})

router.get('/getLogs/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let { id } = request.params
    let data = await service.getLogs(Number(id))

    return response.send({
      statusCode: 200,
      message: 'ok',
      result: data
    })
  } catch (error) {
    return next(error)
  }
})

export default router
