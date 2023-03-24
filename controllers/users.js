const router = require('express').Router()

const { Blog, User } = require('../models')
const { tokenExtractor, usernameFinder } = require('./middleware')


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
    throw Error('Create user failed!')
  }
  res.json(user)
})

router.put('/:username', tokenExtractor, usernameFinder, async (req, res) => {
  const user = req.user
  if(!user || !req.userWithName) {
    throw Error("No user found")
  }
    
  if(user.id !== req.userWithName.id) {
    throw Error("Token and username do not match")
  }

  user.username = req.body.username
  await user.save()
  res.json(user)
})

router.delete('/:username', tokenExtractor, usernameFinder,async (req, res) => {
  const user = req.user
  if(!user || !req.userWithName) {
    throw Error("No user found")
  }  
  
  if(user.id !== req.userWithName.id) {
    throw Error("Token and username do not match")
  }
  user.destroy()
  res.status(204).end()
})

module.exports = router
