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
    series: {
        type: String,
        trim: true
    },
    movieNo: {
        type: Number
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
    releaseDate: {
        type: Date
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

movieSchema.set('timestamps', true)

module.exports = model('movie', movieSchema) 