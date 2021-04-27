const faker = require('faker')
const crypto = require('crypto')
const { encrypt, decrypt } = require('../crypto')
const { invalidBody } = require('../error/invalidBody')
const { invalidPassword } = require('../error/user')
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
        } else if(password.length < 5 || password.length > 20) {
            throw new invalidPassword('Password must be 5-20 characters.')
        }
        const update = await models.changePassword(email, password)
        res.json(update)
    } catch(err){
        next(err)
    }
}


const generateUserProfile = async(req, res, next) => {
    try {
        const arr = ['my ' + faker.animal.dog(), 'my ' + faker.animal.cat(), 'my ' + faker.vehicle.vehicle(), faker.music.genre()]
        const obj = {
            name: faker.name.findName(),
            address: {
                city: faker.address.city(),
                street: faker.address.streetAddress(),
                zip: faker.address.zipCode(),
                state: faker.address.state(),
                country: faker.address.country()
                },
            profession: faker.name.jobType(),
            dob: `${faker.date.between('1971-01-01', '2003-01-01')}`.slice(0, 15),
            hometown: faker.address.city(),
            avatar: faker.image.avatar(),
            personality: 'I love ' + arr[Math.floor(Math.random() * arr.length)],
        }      
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