import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  //console.log(props)
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <>
    <Part p={props.nms_excs[0].name} e={props.nms_excs[0].exercises}/>
    <Part p={props.nms_excs[1].name} e={props.nms_excs[1].exercises}/>
    <Part p={props.nms_excs[2].name} e={props.nms_excs[2].exercises}/>
  </>
)

const Part = (props) => (
  <p>
    {props.p} {props.e}
  </p>
)

const Total = (props) => (
  <p>Number of exercises {
    props.nms_excs[0].exercises +
    props.nms_excs[1].exercises +
    props.nms_excs[2].exercises
    }
  </p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content nms_excs={course.parts} />
      <Total nms_excs={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))