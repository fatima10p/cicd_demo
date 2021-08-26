class safewatchMQService {
  constructor(req, logger) {
    this.logger = logger
    const body = req.body
  }

  async perform() {
    try {

      return true;
    } catch (error) {
      return error
    }
  }
}

module.exports = safewatchMQService