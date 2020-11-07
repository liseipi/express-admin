import express from 'express'
import {authGuard} from "../middleware/global"
// import * as aboutController from '../app/about/about.controller'
import aboutController from '../app/about/about.controller'
import registerController from '../app/register/register.controller'
import loginController from '../app/login/login.controller'
import userController from '../app/user/user.controller'

const router = express.Router()

// router.get('/about', aboutController.index)
router.use('/about', aboutController)
router.use('/register', registerController)
router.use('/login', loginController)

router.use(authGuard)
router.use('/getUserInfo', userController)

export default router
