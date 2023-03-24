const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  if(!user) {
    throw Error(`No such user: ${body.username}`)
  }

  console.log(`Username ${JSON.stringify(user)} user id: ${user.id}`)
  const passwordCorrect = body.password === 'salainen'

  if((!(user && passwordCorrect))) {
    throw Error('Incorrect username or password!')
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  console.log(`Token: ${JSON.stringify(userForToken)}`)

  const token = jwt.sign(userForToken, SECRET)

  response
    .status(200)
    .send({ token, mikkihiiri: userForToken, username: user.username, name: user.name })
})

module.exports = router