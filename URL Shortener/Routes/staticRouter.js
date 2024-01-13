const express = require("express")
const router = express.Router()
const URL = require("../Models/urls")

router.get('/', async (req,res)=> {
    const allURLs = await URL.find({})
    return res.render('Home', {urls: allURLs})
})

module.exports = router
