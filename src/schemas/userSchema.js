const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        trime: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'book'
    }],
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'movie'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
})

userSchema.set('timestamps', true)

module.exports = model('user', userSchema)
