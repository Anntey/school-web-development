import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()
  
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }

  return (
    <div>
      <h2>Filter</h2>
      Filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter