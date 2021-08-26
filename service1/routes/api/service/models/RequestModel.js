const Joi = require('joi')

class RequestModel {

    constructor(body) {
        this.payload = body.payload
    }

    validateSchema() {
        const schema = Joi.object().keys({
                 payload: Joi.string().required()
        })
        return schema.validate(this)
    }
}

module.exports = RequestModel