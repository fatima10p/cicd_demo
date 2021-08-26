const config = require('config')
const express = require('express')
const http = require('http')
const expressPino = require('express-pino-logger')

const app = express()

const api = require('./routes/index')

const logger = require('./common/utils/logger/logger').pinoInstance()
const expressLogger = expressPino({ logger })

const SERVICE_PORT = config.get('PORT') | process.env.PORT

app.use(expressLogger)
app.use(express.json())
app.use('/api', api)

// Fallback to this if no request found
app.use((req, res) => {
  res.sendStatus(404)
})

const server = http.createServer(app).listen(SERVICE_PORT);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const infoString = `Service 1 Server is listening on port # ${SERVICE_PORT}`
logger.info(infoString)
console.log(infoString)

process.on('uncaughtException', (err) => {
  logger.error({ msg: 'Exception Handle', error: err.toString() })
})

module.exports = {
  server
}