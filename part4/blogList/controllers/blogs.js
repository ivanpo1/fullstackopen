const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require("../utils/middleware")

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = await User.findById(request.user.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  const user = await User.findById(request.user.id)
  if (!user) {
    return response.status(404).json({ error: 'user not found' })
  }

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }

  return response.status(403).json({ error: 'only creator can delete post' })

})

blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
  const body = request.body
  const user = await User.findById(request.user.id)

  try {
    const blogToUpdate = await Blog.findById(request.params.id)
    blogToUpdate.likes = body.likes
    blogToUpdate.author = body.author
    blogToUpdate.title = body.title
    blogToUpdate.url = body.url
    blogToUpdate.user = user._id
    const savedBlog = await blogToUpdate.save()

    response.status(200).json(await savedBlog.populate('user', { username: 1, name: 1 }))
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter