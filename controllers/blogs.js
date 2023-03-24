const router = require('express').Router()

const { Blog, User } = require('../models')
const { tokenExtractor, userFromTokenFinder } = require('./middleware')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, userFromTokenFinder,  async (req, res) => {
  const user = req.user
  if(!user) {
    throw Error('No user foound!')
  }

  const blog = await Blog.create({...req.body, userId: user.id})
  if(!blog) {
    throw Error('Create blog failed!')
  }
  res.json(blog)
})

router.put('/:id', tokenExtractor, userFromTokenFinder, blogFinder, async (req, res) => {
  const user = req.user
  if(!user) {
    throw Error('No user foound!')
  }

  const blog = req.blog
  if(!blog)
    throw Error("No blog found")

  if(user.id !== blog.userId) {
    throw Error("Not owner of the blog")
  }

  blog.likes = req.body.likes
  await blog.save()
  res.json(blog)
})

router.delete('/:id', tokenExtractor, userFromTokenFinder, blogFinder,async (req, res) => {
  const user = req.user
  if(!user) {
    throw Error('No user foound!')
  }

  const blog = req.blog
  if(!blog) {
    throw Error("No blog found")
  }

  if(user.id !== blog.userId) {
    throw Error("Not owner of the blog")
  }
  blog.destroy()
  res.status(204).end()
})

module.exports = router
