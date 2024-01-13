const express = require("express")
const URL = require('./Models/urls')
const urlRouter = require('./Routes/url')
const app = express()
const PORT = 8000

// conntection
const {connectMongoDb} = require('./connection')

connectMongoDb()

app.use(express.json())

// routers
app.use('/url', urlRouter)


app.listen(PORT, ()=> console.log("Server started at port " + PORT))