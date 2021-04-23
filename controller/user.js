const faker = require('faker')
const crypto = require('crypto')
const { encrypt, decrypt } = require('../crypto')
const URLSafeBase64 = require('urlsafe-base64')
const { invalidBody } = require('../error/invalidBody')
const models = require('../models/user')


const loginUser = async(req, res, next) => {
    const { email, password } = req.body
    try{
        if (!email || !password) {
            console.log('invalid body')
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
        const update = await models.changePassword(email, password)
        res.json(update)
    } catch(err){
        next(err)
    }
}

const generateUserProfile = async(req, res, next) => {
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
        dob: faker.date.between('1971-01-01', '2003-01-01'),
        hometown: faker.address.city(),
        avatar: faker.image.avatar()
    }

    const base64data = Buffer.from(JSON.stringify(obj)).toString('base64')
    let randomURLSafeBase64
    crypto.randomBytes(32, function(err, buf) {
        if (err) {
        throw err
    }
    randomURLSafeBase64 = URLSafeBase64.encode(base64data)
    //console.log('safeURL   ' + randomURLSafeBase64)
    //console.log(typeof(randomURLSafeBase64))
    })

    const hash = encrypt(Buffer.from(base64data, 'base64'))  //utf8
    console.log(hash)
    //const text = decrypt(hash)
    //console.log(text)

    res.json({
        obj,
        url: hash
    })
}

const generateUserProfileB64 = async(req, res, next) => {
    const hash = req.params.base64data
    
    const text = decrypt(hash)
    const base64 = URLSafeBase64.decode(text)
    //console.log('Base64   ' + base64)
    
    //const buff = Buffer.from(base64data, 'base64');
    const obj = JSON.parse(base64)

    res.json(obj)
}


module.exports = {
    loginUser,
    generateUserProfile,
    getUser,
    changePassword,
    generateUserProfileB64
}