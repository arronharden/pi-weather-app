const { Pool } = require('pg')
const appConfig = require('../config/app-config.json')

const SELECT_ALIASES = `SELECT distinct(alias) FROM ${appConfig.postgres.tableName} ORDER BY alias`
const SELECT_DATA = `SELECT * FROM ${appConfig.postgres.tableName}`
const SELECT_MOST_RECENT_DATA = `SELECT
  ${appConfig.postgres.tableName}.*
  FROM
    (SELECT
      alias, MAX(timestamp) as timestamp
    FROM
    ${appConfig.postgres.tableName}
    GROUP BY
      alias) AS latest_measurements
  INNER JOIN
    ${appConfig.postgres.tableName}
  ON
    ${appConfig.postgres.tableName}.alias = latest_measurements.alias AND
    ${appConfig.postgres.tableName}.timestamp = latest_measurements.timestamp`

let pool

module.exports.init = function () {
  if (!appConfig.postgres.tableName) {
    return Promise.reject(new Error('No table name defined'))
  }
  pool = new Pool({
    user: appConfig.postgres.user,
    host: appConfig.postgres.host,
    database: appConfig.postgres.database,
    password: appConfig.postgres.password,
    port: appConfig.postgres.port
  })
  pool.on('error', (err, client) => {
    console.error(`Postgres error: ${err}`, err)
  })
  return Promise.resolve()
}

module.exports.readAliases = function () {
  return pool.query(SELECT_ALIASES)
}

module.exports.readMostRecentData = function () {
  return pool.query(SELECT_MOST_RECENT_DATA)
}

module.exports.readData = function (fromDate, toDate, alias) {
  let query = SELECT_DATA
  let nextClause = 'WHERE'
  let nextParamNo = 1
  const params = []
  const addClause = function (predicate, value) {
    if (value) {
      query += ` ${nextClause} ${predicate} $${nextParamNo++}`
      params.push(value)
      nextClause = 'AND'
    }
  }

  addClause('timestamp >=', fromDate)
  addClause('timestamp <=', toDate)
  addClause('alias =', alias)
  query += ' ORDER BY timestamp DESC'

  console.debug(`Executing postgres query. query=[${query}] params=${JSON.stringify(params)}`)
  return pool.query(query, params)
}
