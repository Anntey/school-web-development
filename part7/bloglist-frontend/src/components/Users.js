import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import { initializeUsers } from '../reducers/userReducer'

const Users = () => {
  const dispatch = useDispatch()

  // Initialize users
  useEffect(() => {
    userService
      .getAll()
      .then(users => {
        dispatch(initializeUsers(users))
      })
  }, [dispatch])

  const users = useSelector(state => {
    return state.users
  })

  if(users === null) {
    return null
  }

  return (
    <div>
    <h2>Users</h2>

    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Username</th>
          <th scope='col'>Blogs created</th>
        </tr>
      </thead>

      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>

    </table>
    </div>
  )
}

export default Users