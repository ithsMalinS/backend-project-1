const jwt = require('jsonwebtoken')

const userAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization.replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data
        next()
    } catch(e){
        res.status(401).json({error: 'Not authorized!'})
    }
}


module.exports = {
    userAuth,
}