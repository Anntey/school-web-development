import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const LoginState = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => {
    return state.loggedUser
  })

  if(user === null) {
    return null
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    // Clear authentication
    window.localStorage.clear()
    // Notification
    dispatch(setNotification('Logged out, refresh the page'))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 3000)
  }

  return (
    <div id='login-state'>
      {user.name} logged in <button className='btn btn-primary btn-sm' onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LoginState