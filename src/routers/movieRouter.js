const { Router } = require('express')
const asyncHandler = require('express-async-handler')

const movieController = require('../controllers/movieController')
const auth = require('../middleware/auth')
const movieRouter = Router()

movieRouter.post('/addMovie', auth, asyncHandler(movieController.addMovie))

movieRouter.patch('/editMovie', auth, asyncHandler(movieController.editMovie))

movieRouter.delete('/deleteMovie', auth, asyncHandler(movieController.deleteMovie))

module.exports = movieRouter