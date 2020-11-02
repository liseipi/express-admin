import express from 'express'
// import * as aboutController from '../app/about/about.controller'
import aboutController from '../app/about/about.controller'

const router = express.Router()

// router.get('/about', aboutController.index)
router.use('/about', aboutController)

export default router
