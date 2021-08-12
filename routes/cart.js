const express = require('express')
const mongoose = require('mongoose')
const isloggedin = require('../middleware/isloggedin')
const router = express.Router()


require('../models/user')
const User = mongoose.model("User")

require('../models/product')
const Prod = mongoose.model("Product")

router.put('/addtocart', isloggedin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, {
        $push: { cart: req.body.productId }
    }, { new: true })
        .then(result => {

            Prod.findByIdAndUpdate(req.body.productId, {
                $set: { inCart: true }
            })
                .then(() => {
                    console.log('Product is put in a cart')
                })
                .catch(() => {
                    console.log('error while putting into the cart')
                })

            res.send(result)
        })
        .catch(err => res.send(err))
})

router.put('/removefromcart', isloggedin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, {
        $pull: { cart: req.body.productId }
    }, { new: true })
        .then(result => {

            Prod.findByIdAndUpdate(req.body.productId, {
                $set: { inCart: false }
            })
                .then(() => {
                    console.log('Product is removed from a cart')
                })
                .catch(() => {
                    console.log('error while removing from the cart')
                })

            res.send(result)
        })
        .catch(err => res.send(err))
})

router.put('/purchaseAll', isloggedin, (req, res) => {
    // User.findByIdAndUpdate(req.user._id, {
    //     $set: { purchased: req.user.cart }
    // }, { new: true })
    //     .then(result => {
    //         res.send(result)
    //     })
    //     .catch(err => res.send(err))
    (req.user.cart).forEach(element => {
        User.findByIdAndUpdate(req.user._id, {
            $push: { purchased: element }
        }, { new: true })
            .then(result => {

                Prod.findByIdAndUpdate(element, {
                    $set: { isPurchased: true }
                })
                    .then(() => {
                        console.log('Product is purchased')
                    })
                    .catch(() => {
                        console.log('error while purchasing')
                    })

                User.findByIdAndUpdate(req.user._id, {
                    $pull: { cart: element }
                }, { new: true })

                res.send(result)
            })
            .catch(err => res.send(err))
    });
})

router.get('/getCart', isloggedin, async (req, res) => {
    const results = await Prod.find({ _id: { $in: req.user.cart } })
    res.send(results)

})

router.get('/getPurchased', isloggedin, async (req, res) => {
    const results = await Prod.find({ _id: { $in: req.user.purchased } })
    res.send(results)
})

router.put('/emptyCart', isloggedin, function (req, res) {

    (req.user.cart).forEach(element => {
        User.findByIdAndUpdate(req.user._id, {
            $pull: { cart: element }
        }, { new: true })
            .then(result => {

                Prod.findByIdAndUpdate(element, {
                    $set: { inCart: false }
                })
                    .then(() => {
                        console.log('Product is removed from a cart')
                    })
                    .catch(() => {
                        console.log('error while removing from the cart')
                    })

                res.send(result)
            })
            .catch(err => res.send(err))
    });

});

module.exports = router;