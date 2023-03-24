const AppError = require('./AppError')

class TokenNotFoundError extends AppError {
  constructor(message) {
    super(message || 'No token', 404)
  }
}

module.exports = TokenNotFoundError