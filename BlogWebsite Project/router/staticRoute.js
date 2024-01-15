const {Router} = require('express')

const router = Router()

router.get("/", (req, res)=> {
    return res.render('signup')
})

router.get('/signin', (req,res) => {
    return res.render('signin')
})

router.get("/home", (req, res)=> {
    return res.render('home', {user: req.user})
})

module.exports = router;