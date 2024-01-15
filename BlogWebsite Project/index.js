const express = require('express')
const app = express()
const path = require("path")
const {connectMongoDb} = require('./connect')
const router = express.Router()
const PORT = 8000
const cookieParser = require('cookie-parser')

// routers
const staticRouter = require('./router/staticRoute')
const userRouter = require('./router/user')
const { checkForAuthenticationCookie } = require('./middleware/auth')

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))

// templates
app.set('view engine', 'ejs')
app.set("views", path.resolve('./views'))

// connect db
connectMongoDb()

// routes
app.use('/', staticRouter)
app.use('/user', userRouter)

app.listen(PORT, ()=> console.log("Server started at port: " + PORT))