const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const blogs = require('../utils/list_helper')
const helper = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = blogs.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, blogs.initialBlogs.length)
})

test('unique identifier is called "id"', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert(blog.id)
    assert(!blog._id)
  })
})

test('successfully create a blog post', async () => {
  const newBlog = {
    title: 'Dancing in the rain',
    author: 'Chimpi T. Chompa',
    url: 'https://chimpichompa.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, blogs.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('Dancing in the rain'))
})

test('when likes property is missing, it defaults to value 0', async () => {
  const newBlog = {
    title: 'Dancing in the rain',
    author: 'Chimpi T. Chompa',
    url: 'https://chimpichompa.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()

  assert.strictEqual(blogs[blogs.length-1].likes, 0)
})

test('when title or url missing: respond with 400 Bad Request', async () => {
  const newBlog = {
    author: 'Chimpi T. Chompa',
    likes: 13,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})
