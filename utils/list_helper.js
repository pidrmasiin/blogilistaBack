
const blogs = require('../utils/blogsForTesting')

function mode(array)
{
  if(array.length == 0)
    return null
  var modeMap = {}
  var maxEl = array[0], maxCount = 1
  for(var i = 0; i < array.length; i++)
  {
    var el = array[i]
    if(modeMap[el] == null)
      modeMap[el] = 1
    else
      modeMap[el]++
    if(modeMap[el] > maxCount)
    {
      maxEl = el
      maxCount = modeMap[el]
    }
  }
  return maxEl
}


const totalLikes = () => {
  const like = blogs.map(one => one.likes)
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return(
    like.reduce(reducer)
  )
}

const highestLikes = () => {
  const like = blogs.map(one => one.likes)
  const highest = Math.max(...like)
  return(
    highest
  )
}

const mostLikes = () => {
  const like = blogs.map(one => one.likes)
  const highest = Math.max(...like)
  const mostLiked = blogs.filter(one => one.likes === highest)
  const formatBlog = (blog) => {
    return{
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }
  }
  return formatBlog(mostLiked[0])
}

const names = blogs.map(one => one.author)

const mostBlogs = () => {
  const mostBloggedName = mode(names)

  const many = names.filter(name => name === mostBloggedName)

  const blogger = {
    name: mostBloggedName,
    blogs: many.length
  }
  return blogger
}

const mostLiked = () => {

  var namesOnes = []
  names.forEach(function(name){
    if(!namesOnes.includes(name)){
      namesOnes.push(name)
    }
  })

  var likesList = []
  namesOnes.forEach(function(name){

    const namedBlogs = blogs.filter(blog => blog.author === name)
    var likes = 0
    namedBlogs.forEach(function(blog){
      likes += blog.likes
    })

    const blogger = {
      name: name,
      likes: likes
    }
    likesList.push(blogger)
  })

  const numberOne = Math.max.apply(Math,likesList.map(function(o){return o.likes;}))
  const theOne = likesList.filter(x => x.likes === numberOne)

  return theOne[0]

}

module.exports = {
  totalLikes,
  highestLikes,
  mostLikes,
  mostBlogs,
  mostLiked
}