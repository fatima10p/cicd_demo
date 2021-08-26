const config = require('config')

class ClientRequest {

    constructor(logger) {
        this.logger = logger
    }

    getPayloadRequest(data, token) {
        return true;
    }

}
module.exports = ClientRequest;