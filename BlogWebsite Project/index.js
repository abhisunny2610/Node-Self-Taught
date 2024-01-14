const express = require('express')
const app = express()
const path = require("path")
const {connectDB} = require('./connect')
const router = express.Router()
const PORT = 8000

// templates
app.set('view engine', 'ejs')
app.set("views", path.resolve('./views'))

// connect db
connectDB("mongodb://localhost:27017/blog-website")


app.listen(PORT, ()=> console.log("Server started at port: " + PORT))