const db = require('../database/connection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const faker = require('faker')
const { userNotFound, wrongPassword, invalidPassword, requestsExceeded } = require('../error/user')


function loginUser ({email, password}) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT password FROM users WHERE email = ?`, [email], function(err, row){
            if(row == undefined){
                reject(new userNotFound(email))
            } else if(err) {
                reject(err)
            } else {
                if(bcrypt.compareSync(password, row.password)) {
                    const payload = {email: email}
                    const token = jwt.sign(payload, process.env.JWT_SECRET)
                    resolve({token})
                } else {
                    reject(new wrongPassword())
                }
            }
        })
    })
}

function getUser ({email}) {
    return new Promise((resolve, reject) => {
        db.get(`SELECT email FROM users WHERE email = ?`, [email], function(err, row){
            if(row == undefined){
                reject(new userNotFound(email))
            } else if(err) {
                reject(err)
            } else { 
                resolve(row)
            }
        })
    })
}

function changePassword (email, password) {
    if(password.length < 5 || password.length > 20) {
        throw new invalidPassword('Password must be 5-20 characters.')
    }
    return new Promise((resolve, reject) => {
        db.get(`SELECT email, password FROM users WHERE email = ?`, [email], function(err, row){
            if(row == undefined){
                reject(new userNotFound(email))
            } else if(err) {
                reject(err)
            } else {
                if(bcrypt.compareSync(password, row.password)) {
                    reject(new invalidPassword('Select a new password.'))
                } else {
                    db.get(`UPDATE users SET password = ? WHERE email = ?`, [bcrypt.hashSync(password, 10), email], function(err){
                        err ? reject(err) : resolve({success: true, message: `Password updated`})
                    })
                }
            }
        })
    })
}

function generateUserProfile () {
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
            dob: `${faker.date.between('1971-01-01', '2003-01-01')}`.slice(0, 15),
            hometown: faker.address.city(),
            avatar: faker.image.avatar(),
            personality: 'I love ' + arr[Math.floor(Math.random() * arr.length)],
        }
        return obj
}

function checkRequests (user) {
    const MILLISECONDS_IN_A_DAY = 60 * 60 * 24 * 1000
    return new Promise((resolve, reject) => {
        db.get(`SELECT counter, timestamp FROM users WHERE email = ?`, [user], function(err, row){
            if(err){
                reject (err)
            } else if(row == undefined){
                reject(new userNotFound(user))
            } else {
                if(row.timestamp == null || row.timestamp < (Date.now()-MILLISECONDS_IN_A_DAY)) {
                    db.get(`UPDATE users SET counter = ?, timestamp = ? WHERE email = ?`, [10, Date.now(), user], function(err){
                        err ? reject(err) : resolve(true)
                    })
                } else {
                    if(row.counter > 0) {
                        db.get(`UPDATE users SET counter = ? WHERE email = ?`, [row.counter-1, user], function(err){
                            err ? reject(err) : resolve(true)
                        })
                    } else{
                        reject(new requestsExceeded(user))
                    }
                }
            }
        })
    })
}

module.exports = {
    loginUser,
    getUser,
    changePassword,
    generateUserProfile,
    checkRequests
}