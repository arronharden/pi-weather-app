var express = require('express')
var path = require('path')

var measurementsRouter = require('./server/routes/measurements')
// var cognitoAuth = require('./server//lib/cognito-auth')
var postgresClient = require('./server/persistence/postgres-client')
const twitterDigest = require('./server/digests/twitter-digest')

console.log(`Process starting with PID=${process.pid}, APP_CONFIG=${process.env.APP_CONFIG}, NODE_ENV=${process.env.NODE_ENV}`)

postgresClient.init()
twitterDigest.init()

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'build')))

// const cognitoAuthMiddleware = cognitoAuth.getVerifyMiddleware()
app.use('/measurements', /* cognitoAuthMiddleware, */ measurementsRouter)

module.exports = app
