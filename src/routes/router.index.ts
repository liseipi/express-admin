import express from 'express'
// import * as aboutController from '../app/about/about.controller'
import aboutController from '../app/about/about.controller'
import registerController from '../app/register/register.controller'

const router = express.Router()

// router.get('/about', aboutController.index)
router.use('/about', aboutController)
router.use('/register', registerController)

export default router
