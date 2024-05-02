const jwt = require("jsonwebtoken");
const user = require('../model/userSchema')

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            message: 'missing token'
        })
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token,process.env.SECRET_KEY,async(err,decode) => {
        if(err){
            return res.status(403).json({
                message: 'invalid token'
            })
        }

        const User = await user.findOne({_id:decode.id})

        if(!User){
            return res.status(404).json({
                message: 'user not found'
            })
        }

        req.User = User
        next()
    })
}

module.exports = verifyToken