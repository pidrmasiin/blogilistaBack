const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const blogs = require('../utils/blogsForTesting')
const blogsInDb = require('../tests/test_helper')


describe('blogs are returned', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('all blogs are returned as json', async () => {
    const blogsInDatabase = await blogsInDb()
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)
  })

})
describe('addition of a new note', async () => {

  test('a blog can be added & include likes', async () => {
    const blogsAtStart = await blogsInDb()
    const newBlog = {
      title: 'Added blog',
      author: 'Testaaja',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
    expect(addedBlog.body.likes).toBe(0)

    const blogsAfterAdd = await blogsInDb()

    const titles = blogsAfterAdd.map(r => r.title)

    expect(titles).toContain('Added blog')
    expect(blogsAfterAdd.length).toBe(blogsAtStart.length+1)
  })

  test('a blog cant be added without title/url', async () => {
    const newBlog = {
      author: 'Testaaja'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    newBlog.title = 'joku'

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    newBlog.url = 'joku'

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
  })

})

afterAll(() => {
  server.close()
})