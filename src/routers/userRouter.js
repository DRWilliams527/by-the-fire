const { Router } = require('express')
const asyncHandler = require('express-async-handler')

const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const userRouter = Router()

userRouter.post('/registerUser', asyncHandler(userController.registerUser))

userRouter.post('/loginUser', asyncHandler(userController.loginUser))

userRouter.post('/updateUser', auth, asyncHandler(userController.updateUser))

userRouter.get('/logoutUser', asyncHandler(userController.logoutUser))

module.exports = userRouter