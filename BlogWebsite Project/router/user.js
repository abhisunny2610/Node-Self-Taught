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
    // const user = await User.matchPassword(email, password)
    // const user = await User.findOne({email, password})
    // if(!user){
    //     return res.render('signin', {error:"Invalid username or password"})
    // }
    // return res.redirect('/home')

    try{
        const token = await User.matchPassword(email, password)
        return res.cookie('token', token).render("home")
    }catch(error){
        return res.render("/signin", {error: "Incorrect Email or Password"})
    }

})

module.exports = router