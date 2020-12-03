const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs')

require('../models/user')
const User = mongoose.model('User')

router.post('/signup', (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send("Enter all the fields")
    }
    const { name, email, password } = req.body;
    User.findOne({ email: req.body.email })
        .then((existing) => {
            if (existing) {
                res.status(400).send("Email Already Exists")
            }
            else {
                bcrypt.hash(req.body.password, 10)
                    .then((hashed) => {
                        const user = new User({ name, email, password: hashed })
                        user.save()
                            .then(() => {
                                res.send({ message: "success signup" })
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    })
                    .catch(err => res.send(err))
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router;
