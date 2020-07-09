const Blog = require('../models/blog')

const initialBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'EMichael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }
]
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    blogsInDb, initialBlogs
}