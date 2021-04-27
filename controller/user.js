const crypto = require('crypto')
const { encrypt, decrypt } = require('../utils/crypto')
const { invalidBody } = require('../error/invalidBody')
const models = require('../models/user')


const loginUser = async(req, res, next) => {
    const { email, password } = req.body
    try{
        if (!email || !password) {
            throw new invalidBody("Email and password")
        }
        const token = await models.loginUser(req.body)
        res.json(token)
    } catch(err){
        next(err)
    }
}

const getUser = async(req, res, next) => {
    try{
        const user = await models.getUser(req.user)
        res.json(user)
    } catch(err){
        next(err)
    }
}


const changePassword = async(req, res, next) => {
    const email = req.user.email
    const password = req.body.password
    try{
        if(!password){
            throw new invalidBody('Password')
        }
        const update = await models.changePassword(email, password)
        res.json(update)
    } catch(err){
        next(err)
    }
}


const generateUserProfile = async(req, res, next) => {
    try {
        const obj = await models.generateUserProfile()      
        const hash = encrypt(JSON.stringify(obj))
        const base64 = Buffer.from(JSON.stringify(hash)).toString('base64')
        obj.link = `http://localhost:${process.env.PORT}/user/${base64}`
        res.json({obj})
    } catch(err) {
        next(err)
    }
}


const generateUserProfileB64 = async(req, res, next) => {
    try{
        const base64encoded = req.params.base64data
        const decoded = Buffer.from(base64encoded, 'base64').toString()
        const decrypted = decrypt(JSON.parse(decoded))
        res.json(JSON.parse(decrypted))
    } catch(err){
        next(err)
    }
}


module.exports = {
    loginUser,
    generateUserProfile,
    getUser,
    changePassword,
    generateUserProfileB64
}