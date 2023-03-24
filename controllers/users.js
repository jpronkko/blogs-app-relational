const router = require('express').Router()

const { Blog, User } = require('../models')
const { tokenExtractor, usernameFinder } = require('./middleware')

const BlogNotFoundError = require('../errors/BlogNotFoundError')
const NotAuthorizedError = require('../errors/NotAuthorizedError')
const UserNotFoundError = require('../errors/UserNotFoundError')

const getUsersFromReq = (req) => {
  const user = req.user
  const userWithName = req.userWithName
  if(!user || !userWithName) {
    throw new UserNotFoundError()
  }
    
  if(user.id !== userName.id) {
    throw new NotAuthorizedError("Token and username do not match")
  }

  return user
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  if(!user) {
    throw new Error('Create user failed!')
  }
  res.json(user)
})

router.put('/:username', tokenExtractor, usernameFinder, async (req, res) => {
  const user = getUsersFromReq(req, res)
  user.username = req.body.username
  await user.save()
  res.json(user)
})

router.delete('/:username', tokenExtractor, usernameFinder,async (req, res) => {
  const user = getUsersFromReq(req, res)
  user.destroy()
  res.status(204).end()
})

module.exports = router
