import { createStore, combineReducers } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    loggedUser: loginReducer,
    users: userReducer,
    notification: notificationReducer
  })

const store = createStore(reducer)

export default store