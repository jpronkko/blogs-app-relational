const { Sequelize, Model, QueryTypes, DataTypes } = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

//const sequelize = new Sequelize(DATABASE_URL)
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js'
    },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations'}),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name)
  })
}

const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
  console.log('Migration rolled back')
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('Connected to db')
  } catch (error) {
    console.error('Unable to connect to db:', error)
    return process.exit(1)
  }

  return null
}

module.exports = {
  connectToDatabase, sequelize, runMigrations, rollbackMigration
}