import React from 'react'

const User = (props) => {
  const user = props.user
  const blogs = props.user.blogs

  if (user === undefined) {
    return null
  }

  return (
    <div>
      <h2>{user.name}{`'s blogs`}</h2>
      <ul className='list-group list-group-flush'>
        {blogs.map(b =>
          <li className='list-group-item' key={b.id}>{b.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User