const { validateToken } = require("../service/auth")

function checkForAuthenticationCookie(cookieName){
    return (req, res, next)=>{
        const tokinCookieValue = req.cookies[cookieName]

        if(!tokinCookieValue){
           return next()
        }
    
        try {
            const userPayload = validateToken(tokinCookieValue)
            req.user = userPayload
        } catch (error) {}
        next()            
    }
}

module.exports = {checkForAuthenticationCookie}