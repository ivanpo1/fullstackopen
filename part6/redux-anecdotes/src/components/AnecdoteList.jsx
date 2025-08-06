import { voteAnecdote } from "../reducers/anecdoteReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../reducers/notificationReducer.js";


const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const allAnecdotes = state.anecdotes
    const filter = state.filter

    if (filter) {
      return allAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }
    return allAnecdotes
  })

  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(showNotification(`you voted '${content}'`, 5000))

  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.toSorted((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList