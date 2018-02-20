const blogRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return{
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
})

blogRouter.get('/:id', async (request, response) => {

  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(formatBlog(blog))
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })

  }
})

blogRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if(!body.likes){
      body.likes = 0
    } if(!body.url || !body.title){
      response.status(400)
    }
    const blog = new Blog(body)

    await blog.save()
    response.json(formatBlog(blog))
  } catch (exception) {
    console.log(exception)
    response.status(400).json({ error: 'something went wrong...' })
  }

})

blogRouter.put('/:id', async (request, response) => {
  try{
    const likes = request.body 
    const edited = await Blog.findByIdAndUpdate(request.params.id, likes, { new: true })
    response.json(edited).end()
  }catch (exception) {
    console.log(exception)
    response.status(400).json({ error: 'something went wrong' })
  }

})

blogRouter.delete('/:id', async (request, response) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }catch (exception) {
    console.log(exception)
    response.status(400).json({ error: 'already deleted?' })
  }

})

module.exports = blogRouter

