
const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const xssClean = require("xss-clean")
const rateLimiter = require("express-rate-limit")
// require("dotenv").config()


//Database Connection
const port = process.env.PORT || 4000
const database = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@rest-api.fwygqnl.mongodb.net/?retryWrites=true&w=${process.env.MONGO_DATABASE}`
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true, writeConcern: { w: 'majority', j: true, wtimeout: 1000 } }).then(res => {
    app.listen(port, () => {
    })
})

//Middlewares

app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100 //15 minutes
}))
app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: 'https://heroku-ecommerce.vercel.app/'
}));
app.use(helmet())
app.use(xssClean())
app.use(cookieParser())

app.use(bodyParser.json())
app.use('/api', require('./routes/api'))


app.use((err, req, res, next) => {
    res.status(400).send({ error: err.message })
})
