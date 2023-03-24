const { Sequelize, Model, QueryTypes, DataTypes } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to db')
  } catch (error) {
    console.error('Unable to connect to db:', error)
    return process.exit(1)
  }

  return null
}

module.exports = {
  connectToDatabase, sequelize
}