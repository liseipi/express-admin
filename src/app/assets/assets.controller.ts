import { Request, Response, NextFunction } from 'express'
import express from 'express'
import * as service from './assets.service'

const router = express.Router()

router.get('/getAll', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let key = request.query
    let data = await service.getAllAssets(key)

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
    // console.log(id)
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
      // data.status = data.status ? 0 : 1
      data.status = Number(data.status)
    }
    data.createdAt = Math.floor(Date.now() / 1000)
    data.updatedAt = Math.floor(Date.now() / 1000)
    // let monitor_id = []
    // if (data.hasOwnProperty('monitor_id')) {
    //   monitor_id = data.monitor_id
    //   delete data.monitor_id
    // }

    let assetsInfo: any = await service.add(data)

    // let updateMonitor: any = await service.relatedMonitor(assetsInfo.insertId, monitor_id)

    // 记录用户资产日志
    if (data.user_id) {
      let saveData = {
        desktop_id: Number(assetsInfo.insertId),
        user_id: Number(data.user_id),
        start_time: Math.floor(Date.now() / 1000)
      }
      await service.saveLog(saveData)
    }

    return response.send({
      statusCode: 200,
      message: 'ok',
      result: {
        assetsInfo
      }
    })
  } catch (error) {
    return response.send({
      statusCode: 202,
      message: error.message,
      result: null
    })
    // return next(error)
  }
})

router.post('/update/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    let { id } = request.params
    const { data } = request.body
    let oldUserId = data.old_user_id
    delete data.old_user_id

    if (data.hasOwnProperty('status')) {
      // data.status = data.status ? 0 : 1
      data.status = Number(data.status)
    }
    data.updatedAt = Math.floor(Date.now() / 1000)
    // let monitor_id: Array<number> = []
    // if (data.hasOwnProperty('monitor_id')) {
    //   monitor_id = data.monitor_id
    //   delete data.monitor_id
    // }
    // console.log(monitor_id)

    let assetsInfo: any = await service.update(Number(id), data)
    // console.log(assetsInfo)

    // let updateMonitor: any = await service.getRelatedMonitor(Number(id))
    // let aa: Array<any> = JSON.parse(JSON.stringify(updateMonitor))
    // let bb = aa.map(item => item.id)

    // addMonitor
    // let addMonitor_ids = new Set([...new Set(monitor_id)].filter(x => !new Set(bb).has(x)))
    // if ([...addMonitor_ids].length > 0) {
    //   await service.relatedMonitor(Number(id), [...addMonitor_ids])
    // }

    // delMonitor
    // let delMonitor_ids = new Set([...new Set(bb)].filter(x => !new Set([...monitor_id]).has(x)))
    // if ([...delMonitor_ids].length > 0) {
    //   await service.delMonitor([...delMonitor_ids])
    // }

    // 记录用户资产日志
    if (data.user_id != oldUserId) {
      if (oldUserId) {
        let endTime = Math.floor(Date.now() / 1000)
        await service.saveLogEnd(Number(id), oldUserId, endTime)
      }
      let saveData = {
        desktop_id: Number(id),
        user_id: Number(data.user_id),
        start_time: Math.floor(Date.now() / 1000)
      }
      await service.saveLog(saveData)
    }

    return response.send({
      statusCode: 200,
      message: 'ok',
      result: { assetsInfo }
    })
  } catch (error) {
    return response.send({
      statusCode: 202,
      message: error.message,
      result: null
    })
    // return next(error)
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
