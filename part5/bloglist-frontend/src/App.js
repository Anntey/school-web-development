import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LogoutButton from './components/LogoutButton'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setInfoMessage('Logged out, refresh the page')
    setTimeout(() => {
      setInfoMessage(null)
    }, 3000)
  }

  const handleBlogPost = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setInfoMessage(`Added "${blogObject.title}" by ${blogObject.author}`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }

  const handleBlogLike = async (blogObject) => {
    const returnedBlog = await blogService.update(blogObject.id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : returnedBlog))
  }

  const handleBlogDelete = async (blogObject) => {
    await blogService.deleteBlog(blogObject.id, blogObject)
    setBlogs(blogs.filter(blog => blog.id !== blogObject.id))

    setInfoMessage(`Deleted "${blogObject.title}" by ${blogObject.author}`)
    setTimeout(() => {
      setInfoMessage(null)
    }, 5000)
  }

  const blogForm = () => (
    <Togglable LabelFirst='new blog' LabelSecond='cancel' ref={blogFormRef}>
      <BlogForm createBlog={handleBlogPost} />
    </Togglable>
  )

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const displayLoginState = () => (
    <div id='login-state'>
      {user.name} logged in <LogoutButton logoutCall={handleLogout} />
    </div>
  )

  const blogList = () => (
    <div className='bloglist'>
      {blogs.sort((a, b) => b.likes - a.likes).map((blog, i) =>
        <Blog
          key={i}
          blog={blog}
          likeCall={handleBlogLike}
          removeCall={handleBlogDelete}
        />
      )}
    </div>
  )

  return (
    <div>

      <Notification message={infoMessage} />
      <ErrorMessage message={errorMessage} />

      {user === null
        ? <div>
          <h2>Login</h2>
          {loginForm()}
          </div>
        : <div>
          {displayLoginState()}
          <h2>Add blog</h2>
          {blogForm()}
          <h2>Blogs</h2>
          {blogList()}
          </div>
      }

    </div>
  )
}

export default App