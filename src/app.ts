import express from 'express'
import router from './routes/router.index'
import swaggerJSdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument, swaggerOptions } from './config/swagger'
import { defaultErrorHandler } from './exception/global'

const app = express()
// app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.json());
app.use(express.json())

app.use('/api', router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSdoc(swaggerDocument), swaggerOptions))

app.use(defaultErrorHandler)

export default app

