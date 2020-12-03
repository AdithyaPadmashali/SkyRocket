const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

require('../models/product')
const Prod = mongoose.model("Product")

router.get('/allProducts', (req, res) => {
    Prod.find()
        .populate("postedBy", "_id name")
        .then((prods) => {
            res.send(prods)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/myProducts', require('../middleware/isloggedin'), (req, res) => {
    Prod.find({ postedBy: req.user._id })
        .populate('postedBy', '_id name')
        .then((prods) => {
            console.log(prods)
            res.send({ prods })
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
})

router.post('/postProduct', require('../middleware/isloggedin'), (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.price) {
        console.log(req);
        return res.status(422).send({ message: "Please Enter all the required fields" })
    }
    const { name, description, price, photo } = req.body
    const prod = new Prod({
        name, description, price, postedBy: req.user, photo
    })
    prod.save()
        .then((message) => {
            res.send({ message: "product post success!" })
        })
        .catch((err) => res.send({ err }))

})

router.delete('/deleteProd', require('../middleware/isloggedin'), (req, res) => {
    const { id } = req.body;
    Prod.findByIdAndRemove(id)
        .then(product => {
            if (!product) {
                res.send({ message: "Not Found" })
            }
            res.send(product)
        }).catch(err => {
            res.send(err)
        })
})



module.exports = router;