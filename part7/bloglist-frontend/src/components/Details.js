import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import useField from '../hooks/index'

const Details = (props) => {
  const dispatch = useDispatch()
  const comment = useField('comment')
  const blog = props.blog

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

  const handleComment = async (event) => {
    event.preventDefault()
    // Backend
    const returnedBlog = await blogService.addComment(blog.id, comment.value)
    // Frontend
    dispatch(commentBlog(blog.id, comment.value))
    comment.reset()
    // Notification
    dispatch(setNotification(`Commented '${returnedBlog.title}'`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <div className='card'>
        <div className='card-body'>
          <h2>{blog.title}</h2>
          <a href={`${blog.url}`}>{blog.url}</a>
          <p>{blog.likes} likes <button className='btn btn-primary btn-sm' onClick={handleLike}>like</button></p>
          <p>Added by {blog.author}</p>
        </div>
      </div>

      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input value={comment.value} onChange={comment.onChange} />
        <button className='btn btn-primary btn-sm' type="submit">comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => <li key={i}>{comment}</li>)}
      </ul>

    </div>
    )
}

export default Details