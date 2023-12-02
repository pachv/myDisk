const jwt = require("jsonwebtoken")
const log = require("../../log/log")

module.exports = function(req,res,next){
    try {

        const token = req.headers.authorization.split(" ")[1]


        if (!token) {
            return res.status(401).json( {message : "forbidden"})
        }

        req.user = jwt.verify(token, process.env.secretKey)

        next()
    } catch (e) {
        log.Error(`error while authorizing : ${e}`)
        return res.status(401).json( {message : "error while authorization"})
    }
}