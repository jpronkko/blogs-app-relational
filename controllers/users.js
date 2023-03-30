const router = require('express').Router()

const UserNotFoundError = require('../errors/UserNotFoundError')
const { Blog, User } = require('../models')
const { tokenExtractor, userFromTokenFinder } = require('./middleware')

router.get('/', async (req, res) => {
  const users = await User.scope(null).findAll({
    ///attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
    include: {
      model: Blog,
      as: 'blogs',
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  let where = {}

  const read = req.query.read
  if(read !== null && read !== undefined) {
    where = { isRead: read }
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
    include: {
      model: Blog,
      as: 'readings',
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      through: {
        attributes: { exclude: ['userId', 'blogId'] },
        where
      }
    }
  })

  if(!user) {
    throw new UserNotFoundError()
  }
  res.json(user)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  if(!user) {
    throw new Error('Create user failed!')
  }
  res.json(user)
})

router.put('/:username', tokenExtractor, userFromTokenFinder, async (req, res) => {
  const user = req.user
  user.username = req.params.username
  await user.save()
  res.json(user)
})

router.delete('/:username', tokenExtractor, userFromTokenFinder, async (req, res) => {
  const user = req.user
  user.destroy()
  res.status(204).end()
})

module.exports = router
