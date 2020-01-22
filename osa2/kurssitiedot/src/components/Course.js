import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)}
    </div>
  )
}

const Total = ({course}) => {
  return (
    <p>total of {course.parts.reduce((t, a) => { return t + a.exercises },0)} exercises</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course