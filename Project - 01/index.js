const express = require("express")
const users = require('./MOCK_DATA.json')
const fs = require("fs")

const app = express()
const port = 8000


// Middleware - Plugin
app.use(express.urlencoded({ extended: false }))

// Routing

// This route send html data and this is called server side render page
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}.</li>`).join("")}
    </ul>
    `
    return res.send(html)
})


// This route will return json data 
// This route return all the users 
app.get('/api/users', (req, res) => {
    return res.json(users)
})

// This route will return the data of specific user on the basic of id
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id)
    return res.json(user)
})

// This route will create a new user
app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ id: users.length + 1, ...body })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({ status: "fulfilled", id: users.length })
    })
})

//This route will update the user data on the basic of id
app.patch("/api/users/:id", (req, res) => {
    return res.json({ status: "pending" })
})

// This route will delete the user on the basic of id
app.delete("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.filter((user)=> user.id !== id)
    res.json({ message: 'Item deleted successfully', user });
})

app.listen(port, () => console.log("Server Started at Port " + port))