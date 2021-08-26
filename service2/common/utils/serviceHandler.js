const APIEnum = require("./apiEnum")

const perform = function (service, logger, res, apiName) {
  service.perform().then((result) => {
    logger.info({ finalResponse: result }, `Transformed response object for ${apiName} service`)

    if (result.error) {
      const type = result.error.type

      if (type === "ValidationError") {
        res.status(400)

      } else if (type === 'Unauthorized') {
        res.status(401)

      } else if (type === "NotFound") {
        res.status(404)

      } else if (type === "TargetSystemError") {
        res.status(406)

      } else if (type === "TargetSystemValidationError") {
        res.status(406)

      } else if (type === "APIInternalError") {
        res.status(500)

      } else if (type === "ReadTimeout") {
        res.status(598)

      } else if (type === "ConnectTimeout") {
        res.status(599)

      } else {
        // New error = "APIInternalError"
        res.status(500)
      }
    } else {
      res.status(200)
    }

    return res.send(result)

  }).catch((error) => {
    logger.error({ errorStack: error.stack }, `Error in ${apiName} constoller while serving client request`)
    res.status(500).send(error)
  })
}

module.exports = {
  perform
}
