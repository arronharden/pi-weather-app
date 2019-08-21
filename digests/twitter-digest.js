const appConfig = require('../config/app-config.json')
const postgresClient = require('../persistence/postgres-client')
const Twitter = require('twitter')

const DIGEST_PERIOD = 60 * 60 * 1000 // 1 hour
let client

module.exports.init = function () {
  if (!appConfig.twitter) {
    return Promise.reject(new Error('No Twitter configuration defined'))
  }
  client = new Twitter({
    consumer_key: appConfig.twitter.consumerKey,
    consumer_secret: appConfig.twitter.consumerSecret,
    access_token_key: appConfig.twitter.accessTokenKey,
    access_token_secret: appConfig.twitter.accessTokenSecret
  })
  _sendDigest()
  return Promise.resolve()
}

function _sendDigest () {
  // Get the data
  postgresClient.readMostRecentData().then((data) => {
    // tweet it
    let content = ''
    data.rows.forEach(row => {
      const t = (row.temperature !== null ? parseFloat(row.temperature).toFixed(2) + 'C' : 'n/a')
      const h = (row.humidity !== null ? parseFloat(row.humidity).toFixed(2) + '%' : 'n/a')
      const p = (row.pressure !== null ? parseFloat(row.pressure).toFixed(2) + 'hPA' : 'n/a')
      content += `\n${row.alias} temp=${t} h=${h} p=${p}`
    })
    client.post('statuses/update', { status: content }, function (err, tweet, response) {
      setTimeout(_sendDigest, DIGEST_PERIOD)
      if (err) {
        console.error('Tweet error: ' + err, err)
      } else {
        console.log('Successfully sent digest tweet: ' + content)
      }
    })
  })
}
