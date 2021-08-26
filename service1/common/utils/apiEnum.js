const HEADERS_KEY = Object.freeze({
    X_REQ_ID: "x-req-id",
    X_CHANNEL_ID: "x-channel-id",
    X_SUB_CHANNEL_ID: "x-sub-channel-id",
    X_COUNTRY_CODE_ID: "x-country-code"
})

const API_TYPE = Object.freeze({
    apiValidationError: {
        code: 400,
        value: "ValidationError",
        message: "API Validation Error"
    },
    apiUnauthorizedError: {
        code: 401,
        value: "Unauthorized",
        message: "API Unauthorized Error"
    },
    apiNotFoundError: {
        code: 404,
        value: "NotFound",
        message: "API Unauthorized Error"
    },
    apiTargetSystemError: {
        code: 406,
        value: "TargetSystemError",
        message: "API TargetSystem Error"
    },
    apiTargetSystemValidationError: {
        code: 406,
        value: "TargetSystemValidationError",
        message: "API TargetSystemValidation Error"
    },
    apiInternalServerError: {
        code: 500,
        value: "APIInternalError",
        message: "API InternalServer Error"
    },
    apiReadTimeoutError: {
        code: 598,
        value: "ReadTimeout",
        message: "API ReadTimeout Error"
    },
    apiConnectTimeoutError: {
        code: 599,
        value: "ConnectTimeout",
        message: "API ConnectTimeout Error"
    },
})

const RESPONSE_TYPE = Object.freeze({
    fail: {
        type: false,
        value: "Fail"
    },
    success: {
        type: true,
        value: "Success"
    }
})

module.exports = {
    API_TYPE,
    HEADERS_KEY,
    RESPONSE_TYPE    
}