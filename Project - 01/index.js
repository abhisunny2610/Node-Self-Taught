const express = require("express")
const users = require('./MOCK_DATA.json')

const app = express()
const port = 8000


// Routing

// This route send html data and this is called server side render page
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map((user)=> `<li>${user.first_name}.</li>`).join("")}
    </ul>
    `

    return res.send(html)
})


// This route will return json data 
// This route return all the users 
app.get('/api/users', (req,res) => {
    return res.json(users)
})

// This route will return the data of specific user on the basic of id
app.get("/api/users/:id", (req, res)=> {
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id == id)
    return res.json(user)
})

app.listen(port, ()=> console.log("Server Started at Port " + port))