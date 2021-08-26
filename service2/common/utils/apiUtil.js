const APIEnum = require("./apiEnum")

const APIError = require("../model/apiError")
const APIResponse = require("../model/apiResponse")

const API_TYPE = APIEnum.API_TYPE
const RESPONSE_TYPE = APIEnum.RESPONSE_TYPE

const isUndefined = function (o) {
  return o === undefined || o === "undefined"
}

const isNull = function (o) {
  return o === null || o === "null"
}

const isNotNull = function (o) {
  return !isNull(o)
}

const isEmpty = function (o) {
  typeof o === "string" && o.trim() === ""
}

const isNotNullNorEmpty = function (o) {
  return !isNull(o) && !isEmpty(o);
}

const replaceValidationMessage = function (vo) {
  if (vo && vo.error && vo.error.details.length > 0 && vo.error.details[0].message) {
    vo.error.details[0].message = vo.error.details[0].message.replace(/"/g, "'")
  }
}

const maskingCNIC = function (v) {
  if (v && isNotNullNorEmpty(v)) {
    if (v.length > 3) {
      const v1 = v.substring(0, 4)
      const v2 = v.substring(v.length - 4)
      return v1 + 'XXXXX' + v2
    }
  }
  return v
}

const maskingCardNumber = function (v) {
  if (v && isNotNullNorEmpty(v)) {
    if (v.length > 3) {
      const v1 = v.substring(0, 4)
      const v2 = v.substring(v.length - 4)
      return v1 + 'XXXXX' + v2
    }
  }
  return v
}

const apiErrorResponse = function (xReqID, apiType, errorMessage, errorStack) {
  return new APIResponse(RESPONSE_TYPE.fail.value, {}, new APIError(xReqID, apiType.code, errorMessage, apiType.value, errorStack))
}

const apiValidationError = function (xReqID, vo) {
  replaceValidationMessage(vo)
  return apiErrorResponse(xReqID, API_TYPE.apiValidationError, vo.error.details[0].message, vo.error.details)
}

const apiInternalServerError = function (xReqID, error) {
  const errorMessage = "Something went wrong to fullfull the results, Kindly contact with administrator."
  return apiErrorResponse(xReqID, API_TYPE.apiInternalServerError, errorMessage, error)
}

const validateClientResponse = function (xReqID, result) {
  result.ResponseCode = result.responseCode ? result.responseCode : result.ResponseCode
  if (result.ResponseCode === "0000") {
    delete result.responseCode
    return {}
  } else {    
    delete result.responseCode    
    return new APIResponse(RESPONSE_TYPE.fail.value, {}, new APIError(xReqID, result.ResponseCode, result.ResponseDescription, API_TYPE.apiTargetSystemValidationError.value, result))
  }
}

module.exports = {
  isNull,
  isEmpty,
  isNotNull,
  isUndefined,
  isNotNullNorEmpty,
  replaceValidationMessage,
  maskingCNIC,
  maskingCardNumber,
  apiErrorResponse,
  apiValidationError,
  apiInternalServerError,
  validateClientResponse
}