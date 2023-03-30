const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')
const Session = require('./session')

//User.hasMany(Blog)
//Blog.belongsTo(User)

User.hasMany(Blog, { as: 'blogs', foreignKey: 'userId' })
//Blog.belongsTo(User, { as: 'blogsAdded', foreignKey: 'blogId' })
Blog.belongsTo(User, { as: 'enteredBy', foreignKey: 'userId' })

User.hasMany(Session)
Session.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingList, as: 'readers' })

/*Blog.sync({ alter: true })
User.sync({ alter: true })*/

module.exports = {
  Blog, ReadingList, Session, User
}