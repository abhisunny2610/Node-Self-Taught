const express = require("express")
const http = require('http')

const app = express() 

app.get("/", (req, res)=> {
    return res.send("Hello From Home Page")
})

app.get("/about", (req, res)=> {
    return res.send(`Heyy... ${req.query.name}`)
})

app.listen(8000, ()=> console.log("Server Started"))

// const myServer = http.createServer(app)

// myServer.listen(8000, ()=> console.log("Server Started!"))