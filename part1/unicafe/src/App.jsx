import { useState } from 'react'


const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Info = ({ name, amount }) => <p>{name} {amount}</p>

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allFeedback, setAll] = useState([])

    const handleGoodClick = () => {
        setGood(good + 1)
        setAll(allFeedback.concat(1))
    }
    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
        setAll(allFeedback.concat(0))
    }
    const handleBadClick = () => {
        setBad(bad + 1)
        setAll(allFeedback.concat(-1))

    }

    const average = allFeedback.length ? allFeedback.reduce((acc, cur) => acc + cur, 0) / allFeedback.length : 0

    console.log(average)
    console.log('allFeedback: ',allFeedback)
    const positive = allFeedback.length && good ? (good / allFeedback.length) * 100 : 0

    return (
        <div>
            <div>
                <h1>give feedback</h1>
                <Button onClick={handleGoodClick} text='good'/>
                <Button onClick={handleNeutralClick} text='neutral'/>
                <Button onClick={handleBadClick} text='bad'/>
            </div>

            <div>
                <h1>statistics</h1>
            </div>
            <div>
                <Info name='good' amount={good} />
                <Info name='neutral' amount={neutral}/>
                <Info name='bad' amount={bad}/>
                <Info name='all' amount={allFeedback.length}/>
                <Info name='average' amount={average}/>
                <Info name='positive' amount={`${positive} %`}/>
            </div>
        </div>
    )
}



export default App
