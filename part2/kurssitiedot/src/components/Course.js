import React from 'react'

const Header = (props) => (
    <h2>{props.course_name}</h2>
)

const Content = (props) => {
    const total = props.details.reduce((prev, next) => prev + next.exercises, 0)
  
    return (
      <div>
        {props.details.map(part => <Part p={part.name} e={part.exercises} key={part.id} />)}    
        <p>Number of exercises {total}</p>
      </div>
    )
}

const Part = (props) => (
    <p>{props.p} {props.e}</p>
  )

const Course = (props) => {
    return (
        <div>
        <Header course_name={props.course_name} />
        <Content details={props.parts_list} />
        </div>
    )
}

export default Course