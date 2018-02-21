const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(Blog.format))
})

blogRouter.get('/:id', async (request, response) => {

  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(Blog.format(blog))
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


    const savedBlog = await blog.save()

    if(body.user){
      const user = await User.findById(body.user)
      const id = savedBlog._id
      user.blogs = user.blogs.concat(id)
      await user.save()
    }

    response.json(Blog.format(blog))
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

