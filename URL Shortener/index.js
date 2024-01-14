const express = require("express")
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = 8000
const restrictToLoggedInUserOnly = require("./Middleware/auth")

// Routers
const urlRouter = require('./Routes/url')
const staticRouter = require('./Routes/staticRouter')
const userRouter = require('./Routes/user')

// set the view egine to ejs
app.set('view engine', 'ejs')

// set the view(templates) path
app.set("views", path.resolve('./Views'))


// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// conntection
const { connectMongoDb } = require('./connection')
connectMongoDb()


app.use(express.json())

// routers
app.use('/', staticRouter)
app.use('/url', restrictToLoggedInUserOnly, urlRouter)
app.use("/user", userRouter)


app.listen(PORT, () => console.log("Server started at port " + PORT))