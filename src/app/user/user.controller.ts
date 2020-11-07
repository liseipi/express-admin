import express from 'express'
import jwt from 'jsonwebtoken'
import env from '../../config/env'
import {Request, Response, NextFunction} from 'express'

const router = express.Router()

router.get('/', async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.send({
        message: 'ok',
        result: request.body.userInfo
    })
})

export default router