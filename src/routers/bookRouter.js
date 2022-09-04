const { Router, application } = require('express')
const asyncHandler = require('express-async-handler')

const bookController = require('../controllers/bookController')
const auth = require('../middleware/auth')
const bookRouter = Router();

bookRouter.post('/addBook', auth, asyncHandler(bookController.addBook))

bookRouter.delete('/deleteBook', auth, asyncHandler(bookController.deleteBook))

bookRouter.patch('/editBook', auth, asyncHandler(bookController.editBook))

module.exports = bookRouter;