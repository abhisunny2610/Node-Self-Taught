const { getUser } = require("../Service/auth")


const restrictToLoggedInUserOnly = async (req, res, next) => {
    const userId = req.cookies?.uid

    if(!userId) return res.redirect('/login')

    const user = getUser(userId)

    if (!user) return res.redirect('/login')

    req.user = user
    next()

}

module.exports = restrictToLoggedInUserOnly