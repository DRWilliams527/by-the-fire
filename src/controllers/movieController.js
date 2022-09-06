const axios = require('axios')

const Movie = require('../schemas/movieSchema')

const movieController = {
    addMovie: async(req, res) => {
        const user = res.locals.user
        const movies = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${req.body.title}&page=1&include_adult=false`)
        console.log("Response: ", movies.data.results[0])
        const movieDetails = movies.data.results[0]
        const movieData = {owner: user._id, summary: movieDetails.overview, releaseDate: movieDetails.release_date}

        const movieProperties = ['title', 'director', 'actors', 'genre', 'rating', 'notes', 'series', 'movieNo']
        movieProperties.forEach((attribute) => {
            if (req.body[attribute]) movieData[attribute] = req.body[attribute]
        })

        const movie = await Movie.create(movieData)
        user.movies.push(movie)
        await user.save()

        res.status(200).send("Movie added to collection")
    },
    editMovie: async(req, res) => {
        const movie = await Movie.findOne( {_id: req.body.movie_id} )
        console.log("Before: ", req.body.title)
        const movieProperties = ['title', 'director', 'actors', 'genre', 'rating', 'notes', 'series', 'movieNo', 'summary']
        movieProperties.forEach((attribute) => {
            if (req.body[attribute]) movie[attribute] = req.body[attribute]
        })

        console.log("Movie After: ", movie)

        await movie.save()
        res.status(200).send("Movie details updated")
    },
    deleteMovie: async(req, res) => {
        await Movie.deleteOne( {_id: req.body.movie_id} )
        res.status(200).send("Movie deleted from collection")
    }
}

module.exports = movieController