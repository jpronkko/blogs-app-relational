const router = require('express').Router()
const { QueryTypes } = require('sequelize')

const { Blog, User, ReadingList, Session } = require('../models')
const { runMigrations, sequelize } = require('../util/db')

router.delete('/', async (request, response) => {
  await ReadingList.drop()
  await Session.drop()

  await Blog.drop()
  await User.drop()

  const migrations = await sequelize.query('SELECT * FROM migrations', { type: QueryTypes.SELECT })
  console.log('migrations', migrations)
  await sequelize.query('DROP TABLE migrations', { type: QueryTypes.RAW })

  await runMigrations()
  response.status(200).end()
})

module.exports = router