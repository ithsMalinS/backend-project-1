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

//invalid body
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
        dob: faker.date.between('1971-01-01', '2003-01-01'),
        hometown: faker.address.city(),
        avatar: faker.image.avatar(),
        personality: 'I love ' + arr[Math.floor(Math.random() * arr.length)],
    }

    const base64data = Buffer.from(JSON.stringify(obj)).toString('base64')
   let safeURL
    crypto.randomBytes(32, function(err, buf) {
        if (err) {
        throw err
    }
    safeURL = URLSafeBase64.encode(base64data)
    //console.log('safeURL   ' + safeURL)
    //console.log(typeof(safeURL))
    })
    console.log('safeURL:   ' + safeURL)
    const hash = encrypt(Buffer.from(base64data, 'utf8'))  //utf8
    console.log('hash:   ' + hash)
    //const text = decrypt(hash)
    //console.log(text)

    res.json({
        obj,
        url: hash
    })
}

//invalid url
const generateUserProfileB64 = async(req, res, next) => {
    const hash = req.params.base64data
    //console.log(hash)
    //console.log(typeof(hash))
    const base64 = decrypt(hash)
    const text = URLSafeBase64.decode(base64)
    //console.log('Base64   ' + base64)
    
    //const buff = Buffer.from(text, 'base64');
    const obj = JSON.parse(text)

    res.json({obj})
}


module.exports = {
    loginUser,
    generateUserProfile,
    getUser,
    changePassword,
    generateUserProfileB64
}