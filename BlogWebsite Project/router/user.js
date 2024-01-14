const {Router} = require('express')
const User = require('../models/user')

const router = Router()

router.post('/signup', async (req,res)=> {
    const {fullName, email, password} = req.body
    await User.create({
        fullName : fullName,
        email:email,
        password:password
    })

    return res.redirect('/signin')
})

router.post("/signin", async (req, res)=> {

    const {email, password} = req.body
    const user = User.findOne({email, password})
    if(!user){
        return res.render('/signin', {error:"Invalid email or password"})
    }

    return res.render("home")
})

module.exports = router