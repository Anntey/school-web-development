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

let timeoutObj

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      data: message
    })
    // remove previous timeout if exists during call
    if (timeoutObj) {
      clearTimeout(timeoutObj)
    }
    // set new timeout
    timeoutObj = setTimeout(() => {
      dispatch({
        type: 'RESET_MESSAGE'
      })
    }, timeout*1000)
  }
}

export const resetNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'RESET_MESSAGE'
    })
  }
}

export default reducer

