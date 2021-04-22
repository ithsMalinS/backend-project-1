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
                    resolve({success: false, message: `Wrong password`})
                } 
            }
        })
    })
}

function getUser ({email}) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT email FROM users WHERE email = ?`, [email], function(err, row){
            err ? reject(err) : resolve(row)
        })
    })
}

function changePassword (email, password) {
    return new Promise((resolve, reject) => {
        db.get(`UPDATE users SET password = ? WHERE email = ?`, [bcrypt.hashSync(password, 10), email], function(err){
            err ? reject(err) : resolve({success: true, message: `Password updated`})
        })
    })
}



module.exports = {
    loginUser,
    getUser,
    changePassword
}