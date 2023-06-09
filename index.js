const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const authorRouter = require('./controllers/authors')
const readinglistRouter = require('./controllers/readinglists')
const resetRouter = require('./controllers/reset')

const { unknownEndpoint, errorHandler } = require('./controllers/middleware')

app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readinglistRouter)
app.use('/api/reset',resetRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

