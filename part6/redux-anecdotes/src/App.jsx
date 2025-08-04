import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import Notification from './components/Notification.jsx'
import Filter from "./components/Filter.jsx";
import anecdoteService from './services/anecdotes'
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAnecdotes } from "./reducers/anecdoteReducer.js";

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App