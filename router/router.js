const express = require('express')
const user = require('../model/userSchema')
const bcrypt = require('bcryptjs')

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

module.exports = router