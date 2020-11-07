import app from './app'
import env from './config/env'
import { connection } from './database/mysql'

connection.connect(error => {
  if (error) {
    console.log('数据库连接失败..')
    console.log(error)
    return
  }
  console.log('数据库OK')
})

app.listen(env.APP_PORT, () => {
  console.log('service ok.')
})
