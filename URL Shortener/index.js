const express = require("express")
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = 8000
const {restrictToLoggedInUserOnly, chechkAuth} = require("./Middleware/auth")

// Routers
const urlRouter = require('./Routes/url')
const staticRouter = require('./Routes/staticRouter')
const userRouter = require('./Routes/user')


// conntection
const { connectMongoDb } = require('./connection')
connectMongoDb()


// set the view egine to ejs
app.set('view engine', 'ejs')

// set the view(templates) path
app.set("views", path.resolve('./Views'))


// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// routers
app.use('/', chechkAuth, staticRouter)
app.use('/url', restrictToLoggedInUserOnly, urlRouter)
app.use("/user", userRouter)


app.listen(PORT, () => console.log("Server started at port " + PORT))