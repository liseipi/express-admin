import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import env from '../config/env'

export const authGuard = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const authorization = request.header('Authorization')
        if (!authorization) throw new Error()

        const token = authorization.replace('Bearer ', '')
        if (!token) throw new Error()

        const userInfo = jwt.verify(token, `${env.PUBLIC_KEY}`, {algorithms: ['RS256']})

        request.body.userInfo = userInfo

        next()
    } catch (error) {
        next(new Error('UNAUTHORIZED'))
    }
}
