const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: String,
        trim: true,
        required: true,
    },
    genre: {
        type: String,
        trim: true,
    },
    series: {
        type: String,
        trim: true
    },
    bookNo: {
        type: Number,
    },
    dateStarted: {
        type: Date,
        trim: true,
    },
    dateFinished: {
        type: Date,
        trim: true,
    },
    pageCount: {
        type: Number,
    },
    summary: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number,
    },
    notes: [{
        type: String 
    }],
    inProgress: {
        type: Boolean,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

bookSchema.set('timestamps', true)

module.exports = model('book', bookSchema) 