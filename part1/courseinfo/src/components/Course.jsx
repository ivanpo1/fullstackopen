const Header = ({course}) => <h1>{course}</h1>

const Content = ({parts}) => (
    <div>
        {parts.map((part) => (
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
        ))}

    </div>
)

const Part = ({name, exercises}) => (
    <p>
        {name} {exercises}
    </p>
)

const Total = ({parts}) => <p><b>total of {parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises</b></p>

const Course = ({course}) => (
    <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>
)


export default Course