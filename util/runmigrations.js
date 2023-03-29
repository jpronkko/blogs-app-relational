const { runMigrations, sequelize } = require('./db')

sequelize.authenticate()
runMigrations()