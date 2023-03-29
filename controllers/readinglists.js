const router = require('express').Router()
const { Op } = require("sequelize")

const { ReadingList, User }  = require('../models')
const NotAuthorized = require('../errors/NotAuthorizedError')
const UserNotFoundError = require('../errors/UserNotFoundError')
const { tokenExtractor, userFromTokenFinder } = require('./middleware')
const NotAuthorizedError = require('../errors/NotAuthorizedError')

router.post('/', tokenExtractor, userFromTokenFinder,  async (req, res) => {
  const user = req.user
  if(!user) {
    throw new UserNotFoundError()
  }

  const entry = await ReadingList.create({ blogId: req.body.blogId, userId: req.body.userId })
  if(!entry) {
    throw new Error('Reading list entry failed!')
  }
  res.json(entry)
})

router.put('/:id', tokenExtractor, userFromTokenFinder, async (req, res) => {
  const user = req.user
  if(!user) {
    throw new UserNotFoundError()
  }
  const blogId = req.params.id

  const readingList = await ReadingList.findOne({
    where: {
      [Op.and]: [
        { userId: user.id },
        { blogId }
      ]
    }
  })

  if(!readingList) {
    throw Error(`Readinglist not found with user id ${user.id} and blog id ${blogId}`)
  }

  readingList.isRead = req.body.read
  await readingList.save()

  res.json(readingList)
})

module.exports = router