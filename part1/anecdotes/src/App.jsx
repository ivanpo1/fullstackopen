import {useState} from 'react'


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVote] = useState({})
    const handleRandomAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
    const handleVote = () => {
        setVote(prevVotes => ({...prevVotes, [selected]: (prevVotes[selected] || 0) + 1}))
    }
    const getMostVoted = () => {
        const entries = Object.entries(votes)
        let maxKey = 0
        let maxValue = 0

        for (const [key, value] of entries) {
            if (value > maxValue) {
                maxValue = value
                maxKey = Number(key)
            }
        }

        return maxKey
    }

    console.log('votes', votes)

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>
                {anecdotes[selected]}
            </div>
            <div>
                has {votes[selected] ? votes[selected] : 0} votes
            </div>
            <div>
                <Button onClick={handleRandomAnecdote} text={'next anecdote'}/>
                <Button onClick={handleVote} text={'vote'}/>
            </div>
            <h2>Anecdote with most votes</h2>
            <div>
                {anecdotes[getMostVoted()]}
            </div>
            <div>
                has {votes[getMostVoted()] ? votes[getMostVoted()] : 0} votes
            </div>
        </div>
    )
}

export default App
