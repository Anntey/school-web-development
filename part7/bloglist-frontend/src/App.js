import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { setUser } from './reducers/loginReducer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import User from './components/User'
import Users from './components/Users'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Menu from './components/Menu'
import Details from './components/Details'

const App = () => {
  const dispatch = useDispatch()

  // Check user authentication
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const loggedUser = useSelector(state  => state.loggedUser)

  // Mathing for the browser router
  const blogs = useSelector(state => state.blogs)
  const blogMatcher = useRouteMatch('/blogs/:id')
  const blog = blogMatcher
    ? blogs.find(a => a.id === blogMatcher.params.id)
    : null

  const users = useSelector(state => state.users)
  const userMatcher = useRouteMatch('/users/:id')
  const user = userMatcher
    ? users.find(a => a.id === userMatcher.params.id)
    : null

  if (loggedUser === null) {
    return (
      <LoginForm />
    )
  }

  return (
    <div className='container'>
      <h1 className='display-4'>Blog App</h1>

      <Notification />

      <div>
        <Menu />

        <Switch>
          <Route path="/blogs/:id">
            <Details blog={blog} />
          </Route>
          <Route path="/users/:id">
            <User user={user} />
          </Route>
          <Route path="/users/">
            <Users />
          </Route>
          <Route path="/">
            <BlogForm />
            <BlogList />
          </Route>
        </Switch>

      </div>
    </div>
  )
}

export default App