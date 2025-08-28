import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlogQ } from '../requests.js'
import { useShowNotification } from '../NotificationContext.jsx'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const showNotification = useShowNotification()
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: createBlogQ,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      showNotification(`New Blog added: ${title}`, 'success')
      setTitle('')
      setAuthor('')
      setUrl('')
    },
    onError: (error) => {
      console.log(error)
      showNotification(
        `Failed to add Blog: ${error.response.data.error}`,
        'danger'
      )
    },
  })

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title, author, url })
  }

  return (
    <form onSubmit={handleBlogSubmit}>
      <FloatingLabel controlId="floatingTitle" label="Title" className="w-100">
        <Form.Control
          type="text"
          placeholder="Title of the Blog"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingAuthor" label="Author">
        <Form.Control
          type="text"
          placeholder="John Bon Jon Bon Jovi"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingUrl" label="URL">
        <Form.Control
          type="text"
          placeholder="bonjovi.com"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </FloatingLabel>
      <Button className="createBlogButton" variant="success" type="submit">
        Create
      </Button>
    </form>
  )
}

export default BlogForm
