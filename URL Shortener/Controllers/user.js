const User = require("../Models/user")

const handleSignUp = async (req, res) => {
    const {name, email, password} = req.body

    await User.create({
        name, email, password
    })

    return res.render("/")
}

const handleLogIn = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email, password})
    if(!user){
        return res.render('login', {error: "Invalid username or password"})
    }

    return res.render('/')

}

module.exports = {
    handleSignUp,
    handleLogIn,
}