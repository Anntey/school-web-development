import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { initializeBlogs } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()

  // Initialize blogs
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
      dispatch(initializeBlogs(blogs))
    })
  }, [dispatch])

  // Select blog state for further use
  const blogs = useSelector(state  => {
    return state.blogs
  })

  return(
    <div className='bloglist'>
    <h2>Blogs</h2>
    <ul className="list-group">
      {blogs.sort((first, sec) => sec.likes - first.likes).map(b =>
        <Blog
          key={b.id}
          blog={b}
        />
      )}
    </ul>
    </div>
  )
}

export default BlogList