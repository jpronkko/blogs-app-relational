const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { tokenExtractor, userFromTokenFinder } = require('./middleware')

const BlogNotFoundError = require('../errors/BlogNotFoundError')
const NotAuthorizedError = require('../errors/NotAuthorizedError')
const UserNotFoundError = require('../errors/UserNotFoundError')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    /*where.title = {
      //[Op.substring]: req.query.search
      [Op.iLike]: `%${req.query.search}%`
    }*/
    where = {
      [Op.or]: {
        title: {
          [Op.iLike]: `%${req.query.search}%`
        },
        author: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }

      //[Op.substring]: req.query.search
      
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    order: [
      [ 'likes', 'DESC'],
    ],
    where
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, userFromTokenFinder,  async (req, res) => {
  const user = req.user
  if(!user) {
    throw new UserNotFoundError()
  }

  const blog = await Blog.create({...req.body, userId: user.id})
  if(!blog) {
    throw new Error('Create blog failed!')
  }
  res.json(blog)
})

router.put('/:id', tokenExtractor, userFromTokenFinder, blogFinder, async (req, res) => {
  const user = req.user
  if(!user) {
    throw new UserNotFoundError()
  }

  const blog = req.blog
  if(!blog)
    throw new BlogNotFoundError()

  if(user.id !== blog.userId) {
    throw new NotAuthorizedError("Not owner of the blog")
  }

  blog.likes = req.body.likes
  await blog.save()
  res.json(blog)
})

router.delete('/:id', tokenExtractor, userFromTokenFinder, blogFinder,async (req, res) => {
  const user = req.user
  if(!user) {
    throw new Error('No user foound!')
  }

  const blog = req.blog
  if(!blog) {
    throw new BlogNotFoundError()
  }

  if(user.id !== blog.userId) {
    throw new NotAuthorizedError("Not owner of the blog")
  }
  blog.destroy()
  res.status(204).end()
})

module.exports = router
