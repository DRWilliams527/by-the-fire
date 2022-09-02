const { Schema, model } = require('mongoose')
const { Decimal128 } = require('mongodb')

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
        trim: true,
    },
    dateStarted: {
        type: Date,
        trim: true,
    },
    dateFinished: {
        type: Date,
        trim: true,
    },
    summary: {
        type: String,
        trim: true,
    },
    rating: {
        type: Decimal128,
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