const AppError = require('./AppError')

class SessionError extends AppError {
  constructor(message) {
    super(message || 'Session error', 404)
  }
}

module.exports = SessionError