const AppError = require('./AppError')

class BlogNotFoundError extends AppError {
  constructor(message) {
    super(message || 'Blog not found.', 404)
  }
}

module.exports = BlogNotFoundError