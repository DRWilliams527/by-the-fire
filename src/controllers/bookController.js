const axios = require('axios')

const Book = require('../schemas/bookSchema')


const bookController = {
    addBook: async(req, res) => {
        const user = res.locals.user
        const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${req.body.title}&key=${process.env.GOOGLE_BOOKS_API_KEY}`)
        const bookDetails = books.data.items[0].volumeInfo
        const bookData = {owner: user._id, summary: bookDetails.description, pageCount: bookDetails.pageCount}


        const bookProperties = ['title', 'author', 'genre', 'series', 'bookNo', 'dateStarted', 'dateFinished', 'rating', 'notes', 'inProgress']
        bookProperties.forEach((attribute) => {
            if (req.body[attribute]) bookData[attribute] = req.body[attribute]
        })

        const book = await Book.create(bookData)

        user.books.push(book)
        await user.save()

        res.status(200).send("Book added to library")
    },
    editBook: async(req, res) => {
        const book = await Book.findOne( {_id: req.body.book_id} )
        const bookProperties = ['title', 'author', 'genre', 'series', 'bookNo', 'dateStarted', 'dateFinished', 'rating', 'notes', 'inProgress', 'summary', 'pageCount']

        bookProperties.forEach((attribute) => {
            if (req.body[attribute]) book[attribute] = req.body[attribute]
        })

        await book.save()
        res.status(200).send("Book details updated")
    },
    deleteBook: async(req, res) => {
        await Book.deleteOne( {_id: req.body.book_id} )

        res.status(200).send("Book deleted from library")
        
    }
}

module.exports = bookController