class ClientService {
    constructor(clientName, logger) {
        this.logger = logger
        this.clientName = clientName
        this.client = new Client(clientName, this.logger)
    }

    async perform(apiRequest) {
        return true;
    }
}

module.exports = ClientService

