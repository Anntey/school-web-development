import React from 'react'
import { connect } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'


const Notification = (props) => {
  const style = {
    border: 'solid',
    backgroundColor: 'lightgreen',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5
  }

  if (props.notification === null) {
    return null
  }
  
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  resetNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)