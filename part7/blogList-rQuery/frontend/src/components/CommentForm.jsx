import { useState } from 'react'
import { useBlogActions } from '../hooks/useBlogActions.js'

const CommentForm = (id) => {
  const [comment, setComment] = useState('')
  const { handleAddComment } = useBlogActions()

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddComment(id.id, comment)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        aria-label="comment"
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
