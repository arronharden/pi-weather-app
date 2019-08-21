const postgresClient = require('../persistence/postgres-client')

module.exports.getAliases = function (req) {
  if (!req.user || !req.user.scope || !('pi-weather-app.read' in req.user.scope)) {
    // throw Object.assign(new Error('Not authorised to get measurements'), { status: 403 })
  }
  return postgresClient.readAliases()
    .then((result) => {
      return {
        body: result.rows
      }
    })
}

module.exports.getMeasurements = function (req) {
  if (!req.user || !req.user.scope || !('pi-weather-app.read' in req.user.scope)) {
    // throw Object.assign(new Error('Not authorised to get measurements'), { status: 403 })
  }
  return postgresClient.readData(req.query.fromDate, req.query.toDate, req.query.alias)
    .then((result) => {
      return {
        body: result.rows
      }
    })
}

module.exports.getMostRecentMeasurements = function (req) {
  if (!req.user || !req.user.scope || !('pi-weather-app.read' in req.user.scope)) {
    // throw Object.assign(new Error('Not authorised to get measurements'), { status: 403 })
  }
  return postgresClient.readMostRecentData()
    .then((result) => {
      return {
        body: result.rows
      }
    })
}
