


const CourseInfo = () => {
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
      <Header course={course} />
      <Part name={course.parts[0].name} exercises={course.parts[0].exercises}/>
      <Part name={course.parts[1].name} exercises={course.parts[1].exercises}/>
      <Part name={course.parts[2].name} exercises={course.parts[2].exercises}/>

      <Content parts={course.parts}/>

      <Total course={course} />

    </div>
  )
}

const Content = (props) => {


  return (
    <>
      {props.parts.map(part => (
        <div key={part.name}>
          <p>EJERCICIO:</p>
          <p>{part.name}</p>

          <p>Cantidad de ejercicios: {part.exercises}</p>
        </div>
      ))}


    </>
  )
}

const Part = ({name, exercises}) => {
  return <>
    
    <>
          <p>EJERCICIO:</p>
          <p>{name}</p>

          <p>Cantidad de ejercicios: {exercises}</p>


    </>
    
  </>
}

const Header = (props) => <p>Pertenece al curso: {props.course.name}</p>
    

const Total = (props) => {

  const total = props.course.parts.reduce((sum, part) => sum + part.exercises, 0);


  return (
    <>
      <p>CANTIDAD TOTAL DE EJERCICIOS: {total}</p>
    </>
  )

}

export default CourseInfo