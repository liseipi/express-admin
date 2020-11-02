import express from 'express'
import router from './routes/router.index'
import { defaultErrorHandler } from './exception/global'

/**
 * 创建应用
 */
const app = express()

/**
 * 处理JSON
 */
app.use(express.json())

/**
 * 导入路由
 */
app.use(router)

/**
 * 全局处理异常
 */
app.use(defaultErrorHandler)

/**
 * 导出应用
 */
export default app

