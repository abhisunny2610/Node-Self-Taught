const express = require('express')
const app = express()
const path = require("path")
const {connectMongoDb} = require('./connect')
const router = express.Router()
const PORT = 8000
const cookieParser = require('cookie-parser')

app.use(express.static(path.resolve('./uploads/blog')))

// routers
const staticRouter = require('./router/staticRoute')
const userRouter = require('./router/user')
const blogRouter = require('./router/blog')

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
const { checkForAuthenticationCookie } = require('./middleware/auth')
const Blog = require('./models/blog')
app.use(checkForAuthenticationCookie('token'))

// templates
app.set('view engine', 'ejs')
app.set("views", path.resolve('./views'))

// connect db
connectMongoDb()



app.use('/', staticRouter)
app.use('/user', userRouter)
app.use('/blog', blogRouter)

app.listen(PORT, ()=> console.log("Server started at port: " + PORT))