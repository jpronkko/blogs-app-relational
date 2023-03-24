const AppError = require('./AppError')

class NotAuthorizedError extends AppError {
  constructor(message) {
    super(message || 'Not authorized', 401)
  }
}

module.exports = NotAuthorizedError