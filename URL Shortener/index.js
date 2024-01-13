const express = require("express")
const path = require('path')
const URL = require('./Models/urls')
const urlRouter = require('./Routes/url')
const staticRouter = require('./Routes/staticRouter')
const app = express()
const PORT = 8000

// set the view egine to ejs
app.set('view engine', 'ejs')

// set the view(templates) path
app.set("views", path.resolve('./Views'))

// middlewares
app.use(express.urlencoded({extended: false}))

// conntection
const {connectMongoDb} = require('./connection')

connectMongoDb()

app.use(express.json())

// routers
app.use('/', staticRouter)
app.use('/url', urlRouter)


app.listen(PORT, ()=> console.log("Server started at port " + PORT))