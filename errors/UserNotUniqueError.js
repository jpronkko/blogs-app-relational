const AppError = require('./AppError')

class UserNotUniqueError extends AppError {
  constructor(message) {
    super(message || 'No token', 404)
  }
}

module.exports = UserNotUniqueError