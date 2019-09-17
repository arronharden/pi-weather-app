var express = require('express')
var router = express.Router()
var measurementsControllers = require('../controllers/measurements-controller')

/* GET measurements listing. */
router.get('/', function (req, res, next) {
  _invokeController(measurementsControllers.getMeasurements, req, res)
})
router.get('/summary', function (req, res, next) {
  _invokeController(measurementsControllers.getSummaryMeasurements, req, res)
})
router.get('/aliases', function (req, res, next) {
  _invokeController(measurementsControllers.getAliases, req, res)
})

function _invokeController (fn, req, res) {
  let resultProm
  try {
    // fn() can return a value or a promise, wrap with Promise.resolve() here to ensure we always have a promise
    resultProm = Promise.resolve(fn(req))
  } catch (err) {
    resultProm = Promise.reject(err)
  }

  return resultProm
    .then((result) => {
      res.status(result.status || 200).send(result.body)
    })
    .catch((err) => {
      console.error(`Controller caught failure: ${err}`, err)
      if (err.status) {
        res.status(err.status).send(err.message)
      } else {
        res.status(500).send('Internal error occurred.')
      }
    })
}

module.exports = router
