const db = require('./connection.js')
const bcrypt = require('bcryptjs')
require('dotenv').config()

db.run(`INSERT INTO users (email, password, counter)
VALUES('stabbing.steve@fuskeluring.hack', '${bcrypt.hashSync(process.env.STEVE, 10)}', 3), ('murdering.mike@fuskeluring.hack', '${bcrypt.hashSync(process.env.MIKE, 10)}', 3), ('crimes.johnsson@fuskeluring.hack', '${bcrypt.hashSync(process.env.CRIMES, 10)}', 3)`, function(err){})