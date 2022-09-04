const { Schema, model } = require('mongoose')

const movieSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    director: {
        type: String,
        trim: true,
    },
    actors: [{
        type: String,
        trim: true,
    }],
    genre: {
        type: String,
        trim: true,
    },
    summary: {
        type: String,
        trim: true,
    },
    rating: {
        type: Number,
    },
    notes: [{
        type: String,
        trim: true
    }],
    date: {
        type: Date,
        trim: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

movieSchema.set('timestamps', true)

module.exports = model('movie', movieSchema) 