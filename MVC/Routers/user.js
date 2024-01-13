const express = require("express")
const User = require("../Models/user")
const { model } = require("mongoose")
const router = express.Router()
const { handleDeleteUser, handleGetAllUsers, handleGetSingleUser, handleUpdateUser, handleCreateUser } = require('../Controllers/user')


// router for brower

// router.get("/users", async (req, res) => {
//     const allDbUsers = await User.find({})
//     const html = `
//     <ul>
//         ${allDbUsers.map((user) => `<li>{user.firstName} - {user.email}</li>`).join("")
//         }
//     </ul>        
//     `

//     return res.send(html)

// })


// hybrid api for getting users
router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUser)

// routes fot get, delete and update by id
router.route("/:id")
    .get(handleGetSingleUser)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser)


module.exports = router