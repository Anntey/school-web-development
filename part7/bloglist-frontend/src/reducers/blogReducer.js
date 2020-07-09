const reducer = (state = [], action) => {
  switch(action.type) {
    case 'LIKE':
      const id = action.data.id
      const targetBlog = state.find(b => b.id === id)
      const likedBlog = {
        ...targetBlog,
        likes: targetBlog.likes + 1
      }
      return state.map(b => b.id  !== id ? b : likedBlog)
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    case 'INIT_BLOGS':
      return action.data
    case 'COMMENT_BLOG':
      const targetBlog2 = state.find(b => b.id === action.id)
      const commentedBlog = {
         ...targetBlog2,
         comments: targetBlog2.comments.concat(action.content)
      }
      return state.filter(blog => blog.id !== action.id ? blog : commentedBlog)
    default:
      return state
  }
}

export const initializeBlogs = (blogs) => {
  return  {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const likeBlog = (id) => {
  return {
    type: 'LIKE',
    data: { id }
  }
}

export const commentBlog = (id, content) => {
  return {
    type: 'COMMENT_BLOG',
    id,
    content
  }
}

export const createBlog = (content) => {
  return {
      type: 'NEW_BLOG',
      data: content
  }
}

export const deleteBlog = (blog) => {
  return {
    type: 'DELETE_BLOG',
    data: blog
  }
}

export default reducer