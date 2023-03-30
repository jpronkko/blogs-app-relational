const { runMigrations, sequelize } = require('./util/db')

sequelize.authenticate()
runMigrations()