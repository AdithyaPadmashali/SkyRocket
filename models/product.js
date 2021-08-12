const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    photo: {
        type: String,
        required: false
    },
    inCart: {
        type: Boolean,
        default: false
    },
    isPurchased: {
        type: Boolean,
        default: false
    }
})

mongoose.model("Product", productSchema);
