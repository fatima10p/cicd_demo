const config = require("config")
const APIEnum = require("../common/utils/apiEnum")
const APIUtil = require("../common/utils/apiUtil")

const RestClient = require("../clients/rest/restclient")

class Client {
  constructor(clientName, logger, isCore) {
    this.logger = logger
    this.logger.debug({ clientName: clientName }, 'Client object initiated with')
    if (clientName === 'REST') {
      this.reqTimeout = config.get("rest.requestTimeOut")

      this.axiosRestClient = new RestClient(this.reqTimeout, this.logger)
      this.logger.debug({ axiosRestClient: this.axiosRestClient }, 'RESTClient object constructed')
    }
  }

  async performRestRequest(payload) {
    this.logger.debug({ payload: payload }, 'PerformRestRequest recieved method parameters')
    try {
      const response = await this.axiosRestClient.execute(payload.url, payload.headers, payload.method, payload.data)
      // console.log(response, 'response')
      return response.data
    } catch (err) {
      this.logger.error({ errror: err.stack }, 'Error while performing Rest request')
      return this.generateErrorResponse(err, payload.headers.xReqId)
    }
  }

  generateErrorResponse(err, xReqId) {
    delete err.request
    const soapConnectionErrors = ['ENETUNREACH', 'ECONNREFUSED', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'READ_TIMEOUT', 'CONNECT_TIMEOUT', 'EHOSTDOWN']
    if (err) {
      if (soapConnectionErrors.includes(err.code)) {
        if (err.syscall === 'connect') {
          return APIUtil.apiErrorResponse(xReqId, APIEnum.API_TYPE.apiConnectTimeoutError, err.message, err.stack)
        } else {
          const errorMessage = `Request timeout ${this.reqTimeout} ms`
          return APIUtil.apiErrorResponse(xReqId, APIEnum.API_TYPE.apiReadTimeoutError, errorMessage, err.stack)
        }
      }

      const error = err.response
      if (error.status && error.status !== 200) {
        return APIUtil.apiErrorResponse(xReqId, APIEnum.API_TYPE.apiTargetSystemError, error.statusText, err.stack)
      }

      const errorMessage = "The service is not responding currently, Kindly try again or contact with Administrator."
      return APIUtil.apiErrorResponse(xReqId, APIEnum.API_TYPE.apiTargetSystemError, errorMessage, err.stack)
    }
  }
}

module.exports = Client
