const express = require('express')
const cookieParser = require('cookie-parser')

const userRouter = require('./routers/userRouter')
const bookRouter = require('./routers/bookRouter')
const connectDB = require('./db/mongoose')

const app = express();

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded( { extended: false } ) )

app.use('/user', userRouter)
app.use('/book', bookRouter)

app.get('/', (req, res) => {
    res.send('Hello World')
})


app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`) )

//TODO: Path to make persisting state possible