const appConfig = require('../config')
const postgresClient = require('../persistence/postgres-client')
const Twitter = require('twitter')

const DIGEST_PERIOD = 60 * 60 * 1000 // 1 hour
let client

module.exports.init = function () {
  if (!appConfig.twitter) {
    console.warn('No Twitter configuration defined')
    return Promise.resolve()
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

function _toTitleCase(str) {
  return str.replace(
      /([^\W_]+[^\s-]*) */g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}
function _sendDigest () {
  // Get the data
  postgresClient.readLatestData().then((data) => {
    // tweet it
    let content = ''
    const rowsSorted = data.rows.sort((a, b) => { return a.alias.localeCompare(b.alias) })
    rowsSorted.forEach(row => {
      const t = (row.temperature !== null ? ` temp=${parseFloat(row.temperature).toFixed(2)}C`: '')
      const h = (row.humidity !== null ? ` h=${parseFloat(row.humidity).toFixed(2)}%` : '')
      const p = (row.pressure !== null ? ` p=${parseFloat(row.pressure).toFixed(0)}hPa` : '')
      content += `\n${_toTitleCase(row.alias)}:${t}${h}${p}`
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
