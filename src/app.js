const express = require('express')
const connectDB = require('./db/mongoose')
const cookieParser = require('cookie-parser')

const app = express();

connectDB()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded( { extended: false } ) )

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(process.env.PORT, () => console.log(`Server started on ${process.env.PORT}`) )