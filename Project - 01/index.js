const express = require("express")
const fs = require("fs")
const mongoose = require("mongoose")

const app = express()
const port = 8000

// mongo db connection
mongoose.connect("mongodb://localhost:27017/first-database")
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log("Mongo Error", err))



// schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    }
}, {timestamps:true})

const User = mongoose.model("user", userSchema)


// Middleware - Plugin
app.use(express.urlencoded({ extended: false }))

// Routing

// This route send html data and this is called server side render page
app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({})
    const html = `
    <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `
    return res.send(html)
})


// This route will return json data 
// This route return all the users 
app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
})

// This route will return the data of specific user on the basic of id
app.get("/api/users/:id", async (req, res) => {

    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "User not found" })
    return res.json(user)
})

// This route will create a new user
app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {
        return res.status(400).json({ message: "All Fields are Required..." })
    }
    // users.push({ id: users.length + 1, ...body })
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({ status: "fulfilled", id: users.length })
    // })

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle
    })

    return res.status(201).json({message: "User Created Successfully"})

})

//This route will update the user data on the basic of id
app.patch("/api/users/:id", (req, res) => {
    return res.json({ status: "pending" })
})

// This route will delete the user on the basic of id
app.delete("/api/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'Item deleted successfully'});
})

app.listen(port, () => console.log("Server Started at Port " + port))