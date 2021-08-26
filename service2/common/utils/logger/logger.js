const pino = require('pino')
const config = require('config')

const options = {
    level: process.env.LOG_LEVEL || config.get('logging.level'),
    timestamp: () => {
      return `, "time":"${new Date().toJSON()}"`
    },
    formatters: {
      level: (label) => {
        return { level: label };
      },
    }
  }

const pinoInstance = (channel) => {
    if (channel) {
        const childFilePath = `${config.get('logging.basePath')}${channel}.log`
        return pino(options, pino.destination(childFilePath))
    }
    const parentFilePath = `${config.get('logging.basePath')}${config.get('logging.defaultFile')}`
    return pino(options, pino.destination(process.env.LOG_FILE_PATH || parentFilePath))
}

const pinoChildInstance = (channel, properties = { reqId: '' }) => {
    return pinoInstance(channel).child(properties)
}

module.exports = {
    pinoInstance: pinoInstance,
    pinoChildInstance: pinoChildInstance
}