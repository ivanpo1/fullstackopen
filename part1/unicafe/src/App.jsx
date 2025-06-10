import {useState} from 'react'


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({name, value}) => <p>{name} {value}</p>

const Statistics = ({good, neutral, bad, allFeedback}) => {
    const average = allFeedback.length ? allFeedback.reduce((acc, cur) => acc + cur, 0) / allFeedback.length : 0
    const positive = allFeedback.length && good ? (good / allFeedback.length) * 100 : 0

    if (!good && !neutral && !bad) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <StatisticLine name='good' value={good}/>
            <StatisticLine name='neutral' value={neutral}/>
            <StatisticLine name='bad' value={bad}/>
            <StatisticLine name='all' value={allFeedback.length}/>
            <StatisticLine name='average' value={average}/>
            <StatisticLine name='positive' value={`${positive} %`}/>
        </div>
    )
}

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
            <Statistics good={good} bad={bad} neutral={neutral} allFeedback={allFeedback}/>
        </div>
    )
}

export default App
