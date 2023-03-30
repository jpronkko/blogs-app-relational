require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(
  process.env.DATABASE_URL,  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })

const main = async () => {
  console.log(`Trying to connect to db using: ${process.env.DATABASE_URL}.`)
  try {
    await sequelize.authenticate()
    console.log('Connected to db')
    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
    console.log(blogs)
    sequelize.close()
    console.log('Disconnected from db')
  } catch (error) {
    console.error('Unable to connect to db:', error)
  }
}

main()
