const jwt = require('jsonwebtoken')

const User = require('../schemas/userSchema')


const auth = async(req, res, next) => {
    const token = req.cookies.auth

    try {
        const user_id = await jwt.verify(token, `${process.env.JWT_SECRET}`)
        const user = User.findOne( {_id: user_id.data} )
        res.locals.user = user
        return next()
    } catch {
        res.status(401).send({error: "Invalid token, please log in"})
    }
}

module.exports = auth