const Blog = require('../models/blog')
const User = require('../models/user')

const formatBlog = (blog) => {
  return{
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(formatBlog)
}



module.exports = blogsInDb

