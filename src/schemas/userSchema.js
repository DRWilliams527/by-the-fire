const validator = require('validator')

const { Schema, Model } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) 
                throw new Error("Invalid Email")
        }
    },
    name: {
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

module.exports = Model('user', userSchema)
