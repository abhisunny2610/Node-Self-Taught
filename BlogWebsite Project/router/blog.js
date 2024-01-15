const {Router} = require('express')
const Blog = require('../models/blog')
const multer = require('multer')
const path = require("path")


// multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, path.resolve('./uploads/blog'))
    },

    filename: function(req, file, cb){
        const fileName = `${Date.now()} - ${file.originalname}`
        return cb(null, fileName)
    }
})

const upload = multer({storage: storage})

const router = Router()

router.get('/', (req, res)=> {
    return res.render("addBlog", {user: req.user})
})

router.post('/',upload.single('coverImage') ,async(req, res)=> {
    const {title, category, content} = req.body
    // const {coverImage} = req.file
    await Blog.create({
        title: title,
        category: category,
        coverImage: `uploads/blog/${req.file.filename}`,
        content: content,
        author: req.user._id,
    })

    return res.redirect('/home')
})

module.exports = router