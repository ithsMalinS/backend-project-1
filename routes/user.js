const express = require('express')
const routes = express.Router()
const controller = require('../controller/user')
const auth = require('../middleware/authorization')
const reqLimit = require('../middleware/reqLimit')


// log in user
routes.post('/login', controller.loginUser)


/**** requires authorization ****/
// get user
routes.get('/me', auth.userAuth, controller.getUser)

// change password
routes.patch('/me', auth.userAuth, controller.changePassword)

// genererate new profile
routes.get('/generate', auth.userAuth, reqLimit.userLimit, controller.generateUserProfile)
routes.get('/user/:base64data', auth.userAuth, controller.generateUserProfileB64)


module.exports = routes