var express = require('express')
var path = require('path')

var measurementsRouter = require('./routes/measurements')
// var cognitoAuth = require('./lib/cognito-auth')
var postgresClient = require('./persistence/postgres-client')
const twitterDigest = require('./digests/twitter-digest')

postgresClient.init()
twitterDigest.init()

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'build')))

// const cognitoAuthMiddleware = cognitoAuth.getVerifyMiddleware()
app.use('/measurements', /* cognitoAuthMiddleware, */ measurementsRouter)

module.exports = app
