const Joi = require('joi')
const APIEnum = require('../utils/apiEnum')

const HEADERS_KEY = APIEnum.HEADERS_KEY

class CommonHeaders {
    constructor(headers) {
        this.xReqId = null
        this.xChannelId = null
        this.xCountryCode = null

        // X-REQ-ID setting value
        if (headers[HEADERS_KEY.X_REQ_ID]) {
            this.xReqId = headers[HEADERS_KEY.X_REQ_ID].toUpperCase()
        }

        // X-CHANNEL-ID setting value
        if (headers[HEADERS_KEY.X_CHANNEL_ID]) {
            this.xChannelId = headers[HEADERS_KEY.X_CHANNEL_ID].toUpperCase()
        }

        // X-SUB-COUNTRY-ID setting value
        if (headers[HEADERS_KEY.X_COUNTRY_CODE_ID]) {
            this.xCountryCode = headers[HEADERS_KEY.X_COUNTRY_CODE_ID].toUpperCase()
        }
    }

    validateSchema() {
        const schema = Joi.object().keys({
            xReqId: Joi.string().min(12).max(40).required(),
            xChannelId: Joi.string().min(2).max(6).required(),
            xCountryCode: Joi.string().min(2).max(3).required()
        })
        return schema.validate(this)
    }
}

module.exports = CommonHeaders;