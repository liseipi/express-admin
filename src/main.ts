import app from './app'
import env from './config/env'

app.listen(env.APP_PORT, () => {
  console.log('service ok.')
})
