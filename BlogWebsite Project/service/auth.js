const JWT = require("jsonwebtoken")

const secret = "7c22d08bbef4bf3eecd2e8972"

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profile: user.profile,
        role: user.role
    }

    const token = JWT.sign(payload, secret)
    return token
}

function validateToken(token){
    const payload = JWT.verify(token, secret)
    return payload
}

module.exports= {createTokenForUser, validateToken}
