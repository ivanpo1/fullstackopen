import { useState } from 'react'
import { useBlogActions } from '../hooks/useBlogActions.js'
import Button from 'react-bootstrap/Button'

const CommentForm = (id) => {
  const [comment, setComment] = useState('')
  const { handleAddComment } = useBlogActions()

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddComment(id.id, comment)
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
      <Button type="submit">Add comment</Button>
    </form>
  )
}

export default CommentForm
