import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const message = useSelector(state  => {
    return state.notification
  })

  if (message === null) {
    return null
  }

  return (
    <div className='alert alert-primaryalert alert-primary'>{message}</div>
  )
}

export default Notification