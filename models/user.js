const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{ type: ObjectId, ref: "Product" }],
    purchased: [{ type: ObjectId, ref: "Product" }]
})

mongoose.model('User', userSchema);
