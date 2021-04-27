require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

const requireJSON = require('./error/requireJSON')
const logger = require('./middleware/logger')
const errorHandler = require('./error/errorHandler')
const userRoutes = require('./routes/user')

app.use(express.json())
app.use(requireJSON)
app.use(logger)
app.use(userRoutes)


app.use(errorHandler)

app.listen(PORT, () => {
   console.log( `Listening on ${PORT}`)
})