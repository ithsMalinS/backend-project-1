const faker = require('faker')

const models = require('../models/user')


const loginUser = async(req, res, next) => {
    try{
        const token = await models.loginUser(req.body)
        res.json(token)
    } catch(err){
        next(err)
    }
}

const getUser = async(req, res, next) => {
    res.send(req.user)
}

const changePassword = async(req, res, next) => {
    //byt lösenord
}

const generateUserProfile = async(req, res, next) => {
    
    res.send({
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