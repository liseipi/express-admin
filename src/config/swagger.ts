export const swaggerDocument = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Express Admin 项目',
      description: 'express admin',
      version: '1.0.0'
    },
    servers: [
      {
        url: "http://localhost:9288/api",
      },
    ]
  },
  apis: [
    'dist/app/**/*.controller.js'
  ],
  basePath: '/api'
}

export const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    validatorUrl: null
  }
}
