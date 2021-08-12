const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
//secret jwt key ='secretJWTKey'

const isloggedin = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).send({ error: 'authorization error' })
    }
    const token = authorization.replace('Bearer ', '')
    jwt.verify(token, 'secretJWTKey', (err, payload) => {
        if (err) {
            return res.status(401).send({ error: 'authorization error' })
        }
        const id = payload._id
        User.findById(id)
            .then(userdata => {
                req.user = userdata
                next();
            })

    })
}

module.exports = isloggedin