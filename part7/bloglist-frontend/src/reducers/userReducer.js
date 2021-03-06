const reducer = (state = null, action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeUsers = (user) => {
  return {
    type: 'INIT_USERS',
    data: user
  }
}

export default reducer