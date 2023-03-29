const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { Session, User } = require('../models')
const NotAuthorized = require('../errors/NotAuthorizedError')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'salainen'

  if((!(user && passwordCorrect))) {
    throw new NotAuthorized('Incorrect username or password!')
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  console.log(`Token: ${JSON.stringify(userForToken)}`)

  const token = jwt.sign(userForToken, SECRET)

  const session = await Session.create({ userId: user.id, token: token })
  if(!session) {
    throw('Error create session failed!')
  }
  
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router