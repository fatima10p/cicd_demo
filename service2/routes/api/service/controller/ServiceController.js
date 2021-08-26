const loggerJS = require('../../../../common/utils/logger/logger')
const serviceHandler = require('../../../../common/utils/serviceHandler')

const service1 = require('../services/service')

// Safe Watch Message Queue Service
const Service = function (req, res) {
  // console.log('IN CONTROLLER', req.body)
  const logger = loggerJS.pinoChildInstance('service1', { reqId: 'service1' })
  // console.log('IN LOGGER', logger)
  const service = new service1(req, logger)
  serviceHandler.perform(service, logger, res, 'service1')
}

// All function exporting
module.exports = {
  Service
}