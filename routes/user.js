const express = require('express')
const routes = express.Router()
const controller = require('../controller/user')
const auth = require('../middleware/authorization')
const reqLimit = require('../middleware/reqLimit')


// logga in
routes.post('/login', controller.loginUser)


/**** kräver authorization ****/
// hämta användaruppgifter
routes.get('/me', auth.userAuth, controller.getUser)

// ändra lösenord
routes.patch('/me', auth.userAuth, controller.changePassword)

// generera ny användarprofil  OBS saknas personlig egenskap
routes.get('/generate', auth.userAuth, reqLimit.userLimit, controller.generateUserProfile)
routes.get('/user/:base64data', auth.userAuth, controller.generateUserProfileB64)


module.exports = routes