const jwt = require('jsonwebtoken')
const db = require('../database/connection')
const bcrypt = require('bcryptjs')

function loginUser ({email, password}) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT password FROM users WHERE email = ?`, [email], function(err, row){
            if(err) {
                reject(err)
            } else {
                if(bcrypt.compareSync(password, row.password)) {
                    const payload = {email: email}
                    const token = jwt.sign(payload, process.env.JWT_SECRET)
                    resolve({token})
                } else {
                    // fel lösenord
                } 
            }
        })
    })
}



module.exports = {
    loginUser,
}