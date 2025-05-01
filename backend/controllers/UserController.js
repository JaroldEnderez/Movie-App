const bcrypt = require("bcryptjs")
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

const registerUser = asyncHandler(async(req , res ) => {
    const {name, email, password} = req.body

    if(!name||!email||!password){
        res.status(400)
        throw new Error("Please supply all the missing fields")
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User with email already exists")
    }

    const user = await User.create({
        name,email, password
    })

    if (user){
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error("Failed to create user")
    }

})

module.exports = {registerUser}