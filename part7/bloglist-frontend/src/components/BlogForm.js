import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import useField from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const handleBlogPost = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }
    // Backend
    const returnedBlog = await blogService.create(newBlog)
    // Frontend
    dispatch(createBlog(returnedBlog))
    title.reset()
    author.reset()
    url.reset()
    // Notification
    dispatch(setNotification(`Created blog '${returnedBlog.title}' by ${returnedBlog.author}`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }

  return (
    <div>
      <h2>Add blog</h2>
      <Togglable LabelFirst='new blog' LabelSecond='cancel' ref={blogFormRef}>
        <div>
          <form onSubmit={handleBlogPost}>
            <div className='form-group'>
              Title:
              <input
                className='form-control'
                id='title'
                type="text"
                value={title.value}
                name="Title"
                onChange={title.onChange}
              />
            </div>
            <div className='form-group'>
              Author:
              <input
                className='form-control'
                id='author'
                type="author"
                value={author.value}
                name="Author"
                onChange={author.onChange}
              />
            </div>
            <div className='form-group'>
              Url:
              <input
                className='form-control'
                id='url'
                type="url"
                value={url.value}
                name="Url"
                onChange={url.onChange}
              />
            </div>
            <button className='btn btn-primary btn-sm mb-1' id='blogform-submit' type="submit">create</button>
          </form>
        </div>
      </Togglable>
    </div>
  )
}

export default BlogForm