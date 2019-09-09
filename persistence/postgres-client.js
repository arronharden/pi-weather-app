const { Pool } = require('pg')
const appConfig = require('../config')

let pool

module.exports.init = function () {
  if (!appConfig.postgres) {
    return Promise.reject(new Error('No postgres config defined'))
  }
  const reqAttrs = ['user', 'password', 'host', 'tableName', 'database']
  reqAttrs.forEach((attr) => {
    if (!appConfig.postgres[attr]) {
      return Promise.reject(new Error(`Missing required attribute ${attr} in postgres config`))
    }
  })
  const config = {
    user: appConfig.postgres.user,
    host: appConfig.postgres.host,
    database: appConfig.postgres.database,
    password: appConfig.postgres.password,
    port: appConfig.postgres.port
  }
  pool = new Pool(config)
  pool.on('error', (err, client) => {
    console.error(`Postgres error: ${err}`, err)
  })
  return Promise.resolve()
}

module.exports.readAliases = function () {
  const SELECT_ALIASES = `SELECT distinct(alias) FROM ${appConfig.postgre4s.tableName} ORDER BY alias`
  return pool.query(SELECT_ALIASES)
}

module.exports.readMostRecentData = function (alias) {
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
  return pool.query(SELECT_MOST_RECENT_DATA)
}

module.exports.readData = function (fromDate, toDate, alias) {
  const SELECT_DATA = `SELECT * FROM ${appConfig.postgres.tableName}`
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
