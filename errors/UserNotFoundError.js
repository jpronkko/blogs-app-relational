const AppError = require('./AppError')

class UserNotFoundError extends AppError {
  constructor(message) {
    super(message || 'User not found.', 404)
  }
}

module.exports = UserNotFoundError