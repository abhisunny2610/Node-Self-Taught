// const sessionIdtoUserMap = new Map();
const jwt = require("jsonwebtoken")
const secret = 'xqidnsolskoqma169@%$'

const setUser = (user) => {
    // sessionIdtoUserMap.set(id, user)

    return jwt.sign({_id : user._id, email:user.email}, secret)
}

const getUser = (token) => {
    // sessionIdtoUserMap.get(id)
    if (!token) return null
    return jwt.verify(token, secret)
}

module.exports = { setUser, getUser }