import React from 'react'
import { useDispatch } from 'react-redux'
import useField from '../hooks/index'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const username = useField('username')
  const password = useField('password')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      // Backend
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      // Frontend
      dispatch(setUser(user))
      username.reset()
      password.reset()
    } catch (exception) {
      // Notification
      dispatch(setNotification('wrong credentials'))
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return(
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='form-group'>
          Username:
          <input
            className='form-control'
            id='username'
            type="text"
            value={username.value}
            name="Username"
            onChange={username.onChange}
          />
        </div>
        <div className='form-group'>
          Password:
          <input
            className='form-control'
            id='password'
            type="password"
            value={password.value}
            name="Password"
            onChange={password.onChange}
          />
        </div>
        <button className='btn btn-primary btn-sm mt-1' id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm