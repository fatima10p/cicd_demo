class ResponseModel {

    constructor(result) {
        this.message = "Success"
        this.data = {
            ResponseCode: result.ResponseCode,
            ResponseDescription: result.ResponseDescription
        }
    }
}

module.exports = ResponseModel