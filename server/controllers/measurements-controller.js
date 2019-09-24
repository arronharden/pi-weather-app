const postgresClient = require('../persistence/postgres-client')

module.exports.getAliases = function (req) {
  return postgresClient.readAliases()
    .then((result) => {
      return {
        body: result.rows
      }
    })
}

module.exports.getMeasurements = function (req) {
  return postgresClient.readData(req.query.fromDate, req.query.toDate, req.query.alias)
    .then((result) => {
      return {
        body: _mapPostgresResults(result.rows)
      }
    })
}

module.exports.getSummaryMeasurements = function (req) {
  return postgresClient.readLatestData(req.query.alias)
    .then((result) => {
      return {
        body: _mapPostgresResults(result.rows).map((latest) => ({
          alias: latest.alias,
          latest: {
            temperature: latest.temperature,
            pressure: latest.pressure,
            humidity: latest.humidity,
            timestamp: Date.parse(latest.timestamp)
          }
        }))
      }
    })
}

function _mapPostgresResults (rows) {
  const mapItem = function (item, name) {
    if (Object.prototype.hasOwnProperty.call(item, name)) {
      if (item[name] === null || item[name] === undefined) {
        delete item[name]
      } else {
        item[name] = parseFloat(item[name])
      }
    }
  }

  return rows.map((item) => {
    mapItem(item, 'temperature')
    mapItem(item, 'humidity')
    mapItem(item, 'pressure')
    item.timestamp = Date.parse(item.timestamp)
    return item
  })
}
