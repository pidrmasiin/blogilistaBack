const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


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
  } catch(exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }

})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id || !request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

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
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    }else {
      console.log(exception)
      response.status(400).json({ error: 'something went wrong...' })
    }
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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log('id', decodedToken.username)
    if (!decodedToken.id || !request.token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    const user = await User.findOne({ username: decodedToken.username })
    console.log("kayttaja", user)
    console.log('blogit', user.blogs)
    console.log('bloginId', blog.id)
    console.log('metodi', user.blogs.filter(id => id === blog.id))
    if(user.blogs.filter(id => id === blog.id)){
      console.log('moi')
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }


  }catch (exception) {
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    }else {
      console.log(exception)
      response.status(400).json({ error: 'already deleted?' })
    }
  }
})

module.exports = blogRouter

