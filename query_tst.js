const { Blog, User, ReadingList } = require('./models/')
const { connectToDatabase } = require('./util/db')
const { Op } = require("sequelize")

const findUsers = async () => {
  const user = await User.findByPk(1, {
    include: {
      model: Blog,
      as: 'readings',
    }
  })
  console.log(JSON.stringify(user, null, 2))
}

const findReadingList = async () => {
  const readingList = await ReadingList.findOne({
    where: {
      [Op.and]: [
        { userId: 1 },
        { blogId: 2 }
      ]
    }
  })
  console.log(JSON.stringify(readingList, null, 2))
}

connectToDatabase()

findUsers()
findReadingList()