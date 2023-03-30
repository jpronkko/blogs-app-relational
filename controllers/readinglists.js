const router = require('express').Router()
const { Op } = require('sequelize')

const { ReadingList, Blog }  = require('../models')
const { tokenExtractor, userFromTokenFinder } = require('./middleware')

router.post('/', tokenExtractor, userFromTokenFinder,  async (req, res) => {
  const entry = await ReadingList.create({ blogId: req.body.blogId, userId: req.body.userId })
  if(!entry) {
    throw new Error('Reading list entry failed!')
  }
  res.json(entry)
})

router.put('/:id', tokenExtractor, userFromTokenFinder, async (req, res) => {
  const user = req.user
  const blogId = req.params.id

  const blogFound = await Blog.findOne({
    where: { id: blogId }
  })

  if(!blogFound) {
    throw new Error(`You are trying to use non existent blog id ${blogId}!`)
  }

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