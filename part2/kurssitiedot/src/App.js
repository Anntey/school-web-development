import React from 'react'
import Course from './components/Course'

const App = ({courses}) => {
  return (
    <div>
    <h1>Web development curriculum</h1>
    {courses.map(course =>       
      <Course course_name={course.name} parts_list={course.parts} key={course.id} />      
    )}
    </div>
  )
}

export default App
