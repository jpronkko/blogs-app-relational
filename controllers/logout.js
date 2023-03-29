
const router = require('express').Router()

const { Session } = require('../models')
const { tokenExtractor } = require('./middleware')

router.post('/', tokenExtractor, async (req, res) => {
  const userId = req.decodedToken.id

  const session = await Session.findOne({
    where: {
      userId: userId
    }
  })

  if(!session) {
    throw('Logout session failed!')
  }
  
  await session.destroy()
  res.status(200).end()
})

module.exports = router