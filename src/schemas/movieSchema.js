const { Schema, Model } = require('mongoose')
const { Decimal128 } = require('mongoose') 

const movieSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
    },
    director: {
        type: String,
        trim: true,
        required: true,
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
        type: Decimal128,
    },
    notes: [{
        type: String 
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

movieSchema.set('timestamps', true)

module.exports = Model('movie', movieSchema) 