const axios = require('axios')

const User = require('../schemas/userSchema')
const Book = require('../schemas/bookSchema')


const bookController = {
    addBook: async(req, res) => {
        const params = {q: `intitle:${req.body.title}`, key: `${process.env.GOOGLE_BOOKS_API_KEY}`}
        const user = await User.findOne( { username: req.body.username } )
        const bookSummary = await axios.get(`https://www.googleapis.com/books/v1/volumes`, params).items[0].volumeInfo.description
        const requestData = {owner: user._id, summary: bookSummary}


        const bookProperties = ['title', 'author', 'genre', 'series', 'bookNo', 'dateStarted', 'dateFinished', 'rating', 'notes', 'inProgress']
        bookProperties.forEach((attribute) => {
            if (req.body[attribute]) requestData[attribute] = req.body[attribute]
        })

        const book = await Book.create(requestData)

        user.books.push(book)
        await user.save()

        res.status(200).send("Book added to library")
    },
    deleteBook: async(req, res) => {
        const user = await User.findOne( {username: req.body.username} )

        user.books.filter((book) => book !== req.body.book_id)
        await user.save()
        book.deleteOne( {_id: req.body.book_id} )

        res.status(200).send("Book deleted from library")
        
    },
    editBook: async(req, res) => {
        const book = book.findOne( {_id: req.body.book_id} )
        const bookProperties = ['title', 'author', 'genre', 'series', 'bookNo', 'dateStarted', 'dateFinished', 'rating', 'notes', 'inProgress']

        bookProperties.forEach((attribute) => {
            if (req.body[attribute]) book[attribute] = req.body[attribute]
        })

        await book.save()
        res.status(200).send("Book details updated")
    }
}