const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { User, Session } = require('../models')
const TokenNotFoundError = require('../errors/TokenNotFoundError')

const { Op } = require('sequelize')

const usernameFinder = async (req, res, next) => {
  //req.user = await User.findByPk(req.params.id)
  console.log(`User param: ${JSON.stringify(req.params)}`)
  req.userWithName = await User.findOne({
    where: { username: req.params.username }
  })
  console.log(`User with name: ${JSON.stringify(req.userWithName)}`)
  next()
}

const userFromTokenFinder = async (req, res, next) => {
  const userId = req.decodedToken.id
  const session = await Session.findOne({
    where: {
      [Op.and]: [
        { userId: userId },
        { token: req.token }
      ]
    }
  })
  
  if(session) {
    req.user = await User.findByPk(userId)
    console.log(`User from token finder: ${JSON.stringify(req.user)}`)
    next()
  } else {
    next(TokenNotFoundError)
  }
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  console.log(`Authorization: ${authorization}`)

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    req.token = token
    req.decodedToken = jwt.verify(token, SECRET)
  } else {
    //return res.status(401).json({ error: 'token missing'})
    next(new TokenNotFoundError())
  }

  console.log(`Decoded token: ${JSON.stringify(req.decodedToken.id)}`)
  next()

}

/*const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  console.log(`Authorization: ${authorization}`)

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing'})
  }
  console.log(`Decoded token: ${JSON.stringify(req.decodedToken.id)}`)
  next()
}*/

const unknownEndpoint = (req, res) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.error(`Error url: ${fullUrl}`)
  console.error(`Request query ${JSON.stringify(req.query)} param ${JSON.stringify(req.params)} body ${JSON.stringify(req.body)}`)
  res.status(404).send({ error: 'unkown endpoint' })
}

const errorHandler = (err, req, res, next) => {

  console.error(`Error name ${err.name}, ${err.message}, ${err.stack}`)

  if(err.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: err.message })
  } else if(err.name === 'TokenNotFoundError') {
    return res.status(401).send({ error: err.message })
  } else if(err.name === 'NotAuthorizedError') {
    return res.status(401).send({ error: err.message })
  } else if(err.name === 'BlogNotFoundError') {
    return res.status(401).send({ error: err.message })
  } else if(err.name === 'UserNotFoundError') {
    return res.status(401).send({ error: err.message })
  } else if(err.name === 'JsonWebTokenError') {
    return res.status(400).send({ error: 'Token error, please relogin.' })
  }
  //next(err)
  return res.status(501).send({ error: err.message })
}

module.exports = { tokenExtractor, usernameFinder, userFromTokenFinder, unknownEndpoint, errorHandler }