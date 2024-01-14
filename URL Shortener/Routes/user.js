const express = require("express")
const { handleSignUp, handleLogIn } = require("../Controllers/user")

const router = express.Router()

router.post('/', handleSignUp)
router.post("/login", handleLogIn)

module.exports = router