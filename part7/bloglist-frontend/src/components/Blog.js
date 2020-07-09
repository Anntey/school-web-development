import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const displayState = { display: showDetails ? '' : 'none' }
  const blog = props.blog

  const padding = {
    marginBottom: 5,
  }

  const handleLike = async (event) => {
    event.preventDefault()
    // Backend
    const returnedBlog = await blogService.update(blog.id, blog)
    // Frontend
    dispatch(likeBlog(returnedBlog.id))
    // Notification
    dispatch(setNotification(`Liked '${returnedBlog.title}' by ${returnedBlog.author}`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    // Backend
    const returnedBlog = await blogService.deleteBlog(blog.id, blog)
    // Frontend
    dispatch(deleteBlog(returnedBlog))
    // Notification
    dispatch(setNotification(`Deleted "${blog.title}" by ${blog.author}`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  return (
    <div className='singleBlog'>
      <li style={padding} className='list-group-item list-group-item-action flex-column align-items-start'>
      <div id='details-div' onClick={() => setShowDetails(!showDetails)}>
        <b><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></b> {blog.author}
      </div>
      <div className="detailsToggleDiv" style={displayState}>
        <p>{blog.url}</p>
        <p className='likes'>{blog.likes}<button className='btn btn-primary btn-sm ml-1' onClick={handleLike}>like</button></p>
        <p>{blog.user.name}</p>
        <p><button className='btn btn-primary btn-sm' onClick={handleDelete}>remove</button></p>
      </div>
      </li>
    </div>
  )
}

export default Blog