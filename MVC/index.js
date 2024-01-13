const express = require("express")
const app = express()

const port = 8000

// connection function
const {connectMongoDb} = require('./connection')

// controllers
const userRouter = require("./Routers/user")


// connecting database
connectMongoDb("mongodb://localhost:27017/first-database")

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }))

// Routes
app.use("/users", userRouter)

app.listen(port, ()=> console.log("Server Started at port " + port))