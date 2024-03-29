const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const port = 5000;
const cors = require('cors')
const mongoose = require('mongoose')
// const uri = 'mongodb+srv://adithya:rk4cdoKorHi5aNOr@cluster0.iubel.mongodb.net/Cluster0?retryWrites=true&w=majority'
const uri = 'mongodb+srv://adithya:rk4cdoKorHi5aNOr@cluster0.iubel.mongodb.net/Cluster0?retryWrites=true&w=majority'

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log("mongo?Error");
    })

app.use(cors())
app.use(express.json())
// app.use(bodyParser.json())

app.use(require('./routes/signup.js'))
app.use(require('./routes/signin.js'))
app.use(require('./routes/postProduct.js'))
app.use(require('./routes/cart.js'))
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})