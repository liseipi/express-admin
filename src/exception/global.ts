import { Request, Response, NextFunction } from 'express'

export const defaultErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error.message) {
    console.log(`❄, ${error.message}`)
  }
  let statusCode: number, message: string
  switch (error.message) {
    default:
      statusCode = 500
      message = '服务发热了...'
  }
  response.status(statusCode).send({ message })
}
