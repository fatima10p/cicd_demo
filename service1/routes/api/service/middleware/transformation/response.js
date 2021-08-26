const ResponseModel = require('../../models/ResponseModel')

class ClientResponse {
    constructor(logger) {
        this.logger = logger
    }

    getPayLoadResponse(headers, result) {
        this.logger.debug({ channelId: headers.xChannelId, result: result }, 'ClientResponse service parameters')
        
        const respData = new ResponseModel(result)
        this.logger.debug({ res: respData }, 'Client Request Converted to ResponseModel')
        return respData
    }
}
module.exports = ClientResponse
