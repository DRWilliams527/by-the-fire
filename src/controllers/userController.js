const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../schemas/userSchema')

const userController = {
    registerUser: async(req, res) => {
        const username = req.body.username

        const potentialUser = await User.findOne( { username } )
        if (!potentialUser) {
            const password = await bcrypt.hash(req.body.password, 10)
            
            const user = User.create({
                username: username,
                password: password,
            })
        
            const token = await jwt.sign({data: user._id}, `${process.env.JWT_SECRET}`, {expiresIn: '24h'})
        
            res.cookie('auth', token, {
                expires: new Date(Date.now() + (3600 * 1000 * 24)),
                httpOnly: true,
                sameSite: true,
            })
            res.status(200).send(user)
        } else {
            res.send("Username already exists")
        }
    },
    loginUser: async(req, res) => {
        const password = req.body.password
        let validated = false
        
        const user = await User.findOne( { username: req.body.username } )
        
        if (user) {
            validated = await bcrypt.compare(password, user.password)
        }
        
        if (validated) {
            const token = await jwt.sign({data: user._id}, `${process.env.JWT_SECRET}`, {expiresIn: '24h'})
            await user.populate('books')
            // await user.populate('movies')
            await user.populate('friends')
            
            res.cookie('auth', token, {
                expires: new Date(Date.now() + (3600 * 1000 * 24)),
                httpOnly: true,
                sameSite: true,
            })
            res.status(200).send(user)
        } else {
            res.send("Username or password incorrect")
        }
    },
    updateUser: async(req, res) => {
        const validUpdates = ['username', 'password', 'newPassword', 'newUsername']
        const updates = Object.keys(req.body)
        const newPassword = req.body.newPassword
        const newUsername = req.body.newUsername

        
        const validAction = updates.every((element) => {
            return validUpdates.includes(element)
        })
        
        if (validAction) {
            let potentialUser = false
            let updatingUsername = newUsername ? true : false
            let updatingPassword = newPassword ? true : false

            if (updatingUsername) potentialUser = await User.findOne( { username: newUsername } )
            if (!potentialUser) {
                const user = res.locals.user
                if (updatingUsername) user.username = newUsername
                if (updatingPassword) user.password = await bcrypt.hash(newPassword, 10)
                user.save()
                res.status(200).send("User credentials updated")
            } else {
                res.send("Username already exists") 
            }
        } 
        else {
            res.status(401).send("Bad data sent")
        }


    },
    logoutUser: async(req, res) => {
        res.clearCookie('auth')
        res.status(200).send("Successfully logged out")
    },

    //TODO: Implement add friend
    //TODO: Implement get friend 
    //TODO: Implement delete user (save deleted users?)

}

module.exports = userController