import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer.js'

const CommentForm = ({ id }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addComment(id, comment))
    setComment('')
  }

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        aria-label="comment"
      />
      <button type="submit">Add comment</button>
    </form>
  )
}

export default CommentForm
