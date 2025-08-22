import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBlogQ } from '../requests.js'
import { useShowNotification } from '../NotificationContext.jsx'

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
    },
  })

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    newBlogMutation.mutate({ title, author, url })
    showNotification(`New Blog added: ${title}`)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleBlogSubmit}>
      <div>
        title:
        <input
          aria-label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          aria-label="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          aria-label="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
