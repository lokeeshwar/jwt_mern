const express = require('express')
const user = require('../model/userSchema')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/token')
const verifyToken = require('../middleware/verifyToken')

const router =express.Router()

router.get("/test",(req,res) => {
    res.json({
        message : 'testing sucess'
    })
})


router.post("/user",async (req,res) => {
    const {email,password} = req.body

    const User = await user.findOne({email})

    if(!User){
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser =new user ({email : email , password : hashedPassword})

        await newUser.save();

        return res.status(201).json({
            message: 'userCreated'
        })
    }
})

router.post("/authentication",async(req,res) =>{
    const {email,password} = req.body

    const User = await user.findOne({email})

    if(!email){
        return res.status(401).json({
            message: 'user not found'
        })
    }

    const isMatch = await bcrypt.compare(password , User.password)

    if (!isMatch) {
        return res.status(401).json({
            message: 'password incorrect'
        })
    }

    const token = generateToken(User)

    res.json({token})

})


router.get("/data",verifyToken,(req,res) => {
    console.log(req.headers);

    res.json({
        message:`welcome ${req.User.email} this is protected data`
    })
})

module.exports = router

