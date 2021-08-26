const clientRequest = require('axios')

class RestClient {
  constructor(timeout, logger) {
    this.logger = logger
    this.timeout = timeout
    this.clientRequest = clientRequest
  }

  async execute(url, headers, method, data) {
    this.logger.debug({ url: url, headers: headers, method: method, data: data }, 'RestClient execute method parameters')
    const options = {
      url: url,
      data: data,
      method: method,
      headers: headers,
      timeout: this.timeout,
      responseType: "json",
    }
    this.logger.debug({ options: options }, 'RestClient options to be executed')
    return this.clientRequest(options)
  }
}

module.exports = RestClient