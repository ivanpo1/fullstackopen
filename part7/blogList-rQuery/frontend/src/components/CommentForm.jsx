import { useState } from 'react'
import { useBlogActions } from '../hooks/useBlogActions.js'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CommentForm = (id) => {
  const [comment, setComment] = useState('')
  const { handleAddComment } = useBlogActions()

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddComment(id.id, comment)
    setComment('')
  }

  return (
    <Form className="commentForm" onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        placeholder="Leave a comment..."
        aria-label="comment"
      />
      <Button type="submit" variant="success">
        Add comment
      </Button>
    </Form>
  )
}

export default CommentForm
