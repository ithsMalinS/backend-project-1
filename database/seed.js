const db = require('./connection.js')
const bcrypt = require('bcryptjs')

db.run(`INSERT INTO users (email, password)
VALUES('stabbing.steve@fuskeluring.hack', '${bcrypt.hashSync(process.env.STEVE, 10)}'), ('murdering.mike@fuskeluring.hack', '${bcrypt.hashSync(process.env.MIKE, 10)}'), ('crimes.johnsson@fuskeluring.hack', '${bcrypt.hashSync(process.env.CRIMES, 10)}')`, function(err){})