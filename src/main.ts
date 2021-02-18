import app from './app'
import env from './config/env'
import { connection } from './database/mysql'

connection.getConnection((err, con) => {
  if (err) {
    console.log('数据库连接失败..')
    console.log(err)
    return
  }
  console.log('数据库OK')
})

app.listen(env.APP_PORT, () => {
  console.log('service ok.')
})