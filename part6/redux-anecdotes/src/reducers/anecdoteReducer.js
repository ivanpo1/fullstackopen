import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
  }
})


export const { vote, setAnecdotes, appendAnecdote  } = anecdoteSlice.actions

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToVote = getState().anecdotes.find(anecdote => anecdote.id === id)
    const updatedAnecdote = {
      ...anecdoteToVote, votes: anecdoteToVote.votes + 1
    }

    const response = await anecdoteService.update(id, updatedAnecdote)
    dispatch(vote(response))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export default anecdoteSlice.reducer