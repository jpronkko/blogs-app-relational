const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
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
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}