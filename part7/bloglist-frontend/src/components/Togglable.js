import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className='btn btn-primary btn-sm' onClick={toggleVisibility}>{props.LabelFirst}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className='btn btn-primary btn-sm' onClick={toggleVisibility}>{props.LabelSecond}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  LabelFirst: PropTypes.string.isRequired,
  LabelSecond: PropTypes.string.isRequired
}

export default Togglable