const cors = require('cors')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1})

  response.json(blogs)  
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // const user = await User.findOne({ username: 'sivukayttaja' })
  const user = await User.findById(decodedToken.id)
  blog.user = user

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const content = request.body.content

  if (!content) {
    return response.status(400).send({ error: 'content missing' })
  }

  const blog = await Blog.findById(request.params.id)
  
  if (!blog) {
    return response.status(400).send({ error: 'blog not found' })
  }

  blog.comments = blog.comments.concat(content)

  const result = await blog.save()

  response.status(201).json(result)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  console.log(request.params.id)
  const blog = await Blog
    .findById(request.params.id)
    .select('comments')

  response.json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 })

  response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  
  response.status(204).end()
})

module.exports = blogsRouter
