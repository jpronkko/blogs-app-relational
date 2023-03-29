const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER,
    //allowNull: false,
    validate: { 
      isBetweenYears(value) {
        if (!value)
        return
   
        const year = parseInt(value)
        if (year < 1991) {
          throw new Error('Year must be later or equal to 1991!')
        }
        if (year > new Date().getFullYear()) {
          throw new Error('Year must not be greater than the current year!')
        }
      }
    },
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blog'
})

module.exports = Blog