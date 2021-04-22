const db = require('../database/connection')

//24 h = 86400000 ms
//2 minutes = 120000 ms

const userLimit = (req, res, next) => {
    const user = req.user.email
    try{
        db.get(`SELECT counter, timestamp FROM users WHERE email = ?`, [user], function(err, row){
            if(err){
                throw err
            } else if(row == undefined){
                res.status(406).json({error: `User ${user} not found`})
            } else {
                if(row.timestamp == null || row.timestamp < (Date.now()-120000)) {
                    db.get(`UPDATE users SET counter = ?, timestamp = ? WHERE email = ?`, [3, Date.now(), user], function(err){
                        if(err){
                            throw err
                        } else{
                            next()
                        }
                    })
                } else {
                    if(row.counter > 0) {
                        db.get(`UPDATE users SET counter = ? WHERE email = ?`, [row.counter-1, user], function(err){
                            if(err){
                                throw err
                            } else {
                                next()
                            }
                        })
                    } else{
                        res.status(406).json({error: `Requests for ${user} exceeded`})
                    }
                }
            }
        })
    }catch(err){
        next(err)
    }
}

module.exports = {
    userLimit,
}