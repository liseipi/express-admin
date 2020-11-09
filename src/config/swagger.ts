export const swaggerDocument = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express Admin 项目',
      version: '1.0.0',
      description: 'express admin'
    }
  },
  apis: [
    'dist/app/**/*.controller.js'
  ]
}

export const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    validatorUrl: null
  }
}
