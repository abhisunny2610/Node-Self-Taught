const {Router} = require('express')
const Blog = require('../models/blog')
const router = Router()

router.get("/", (req, res)=> {
    return res.render('signup')
})

router.get('/signin', (req,res) => {
    return res.render('signin')
})

router.get("/home", async (req, res)=> {
    const blogs = await Blog.find({})
    return res.render('home', {user: req.user, blogs:blogs})
})

module.exports = router;