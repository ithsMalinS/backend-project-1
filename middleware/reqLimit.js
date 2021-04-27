const db = require('../database/connection')
const models = require('../models/user')
//24 h = 86400000 ms
//2 minutes = 120000 ms

const userLimit = async (req, res, next) => {
    const user = req.user.email
    try{
        await models.checkRequests(user)
        next()
    }catch(err){
        next(err)
    }
}

module.exports = {
    userLimit,
}