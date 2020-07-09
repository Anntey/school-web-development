import React, { useState } from 'react'
import LikeButton from './LikeButton'
import RemoveButton from './RemoveButton'

const Blog = ({ blog, likeCall, removeCall }) => {
  const [showDetails, setShowDetails] = useState(false)

  const displayState = { display: showDetails ? '' : 'none' }

  const style = {
    border: '2px dotted gray',
    marginBottom: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  }

  const addLike = (event) => {
    event.preventDefault()

    likeCall({ ...blog, likes: blog.likes + 1 })
  }

  const removeBlog = (event) => {
    event.preventDefault()

    removeCall(blog)
  }

  return(
    <div className='blog' style={style}>
      <div id='details-div' onClick={() => setShowDetails(!showDetails)}>
        <b>{blog.title}</b> {blog.author}
      </div>
      <div className="detailsToggleDiv" style={displayState}>
        <p>{blog.url}</p>
        <p className='likes'>{blog.likes} <LikeButton likeCall={addLike}/></p>
        <p>{blog.user.name}</p>
        <p><RemoveButton removeCall={removeBlog} /></p>
      </div>
    </div>
  )
}

export default Blog