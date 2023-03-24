// Idea presented in blog post:
// https://medium.com/hexient-labs/custom-errors-with-node-express-8fc744e3b220

class AppError extends Error {
  constructor(message, status) {
    super()
  
  //Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = message ||
    'An error occured'
  this.status = status || 500
  }
}

module.exports = AppError