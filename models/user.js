const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

class User extends Model {}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true 
    }
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user',
  defaultScope: {
    where: {
      disabled: false
    }
  },
  scopes: {
    disabled: {
      where: {
        disabled: true
      }
    },
    enabled: {
      where: {
        disabled: false
      }
    }
  }
})

module.exports = User
