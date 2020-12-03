const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const secretJWTKey = 'secretJWTKey'

require('../models/user')
const User = mongoose.model('User')

router.get('/resource', require('../middleware/isloggedin'), (req, res) => {
    res.send({ protected: 'You are logged in if you are able to see this message' })
})

router.post('/signin', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send("Enter all the details")
    }
    const { email, password } = req.body;
    User.findOne({ email: req.body.email })
        .then((existing) => {
            if (!existing) {
                return res.status(400).send("Invalid Email or Password")
            }
            else {
                bcrypt.compare(req.body.password, existing.password)
                    .then((matched) => {
                        if (matched) {
                            // res.send({ message: 'signed in successfully' })
                            const token = jwt.sign({ _id: existing._id }, secretJWTKey);
                            res.send({ token, user: existing })
                        }
                        else {
                            return res.status(400).send("Invalid Email or Password")
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        res.send(error)
                    })
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router;
