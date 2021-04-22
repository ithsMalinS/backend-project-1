const faker = require('faker')

const {invalidBody} = require('../error/invalidBody')
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
    
    res.json({
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
    })
}


module.exports = {
    loginUser,
    generateUserProfile,
    getUser,
    changePassword
}