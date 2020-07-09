const reducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return action.data
    case 'RESET_MESSAGE':
      return null
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
      type: 'SET_MESSAGE',
      data: message
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_MESSAGE'
  }
}

export default reducer