const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('readinglists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' }
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      uniqueKeys:{
        unique_tag: {
          customIndex: true,
          fields: ['blog_id', 'user_id']
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.droptTable('readinglists')
  },
}