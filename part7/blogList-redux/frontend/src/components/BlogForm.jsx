import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer.js'
import { Button, Container, Group, Paper, TextInput } from '@mantine/core'

const BlogForm = ({ togglableRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await dispatch(createBlog({ title, author, url }))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit}>
      <Paper shadow="sm" radius="md" withBorder p="xl" mt="md" mb="xs">
        <TextInput
          label="Title"
          aria-label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <TextInput
          label="Author"
          aria-label="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

        <TextInput
          label="Url"
          aria-label="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Group grow mt="md">
          <Button type="submit" color="green">
            Create
          </Button>
          <Button
            type="button"
            color="yellow"
            onClick={() => togglableRef.current.toggleVisibility()}
          >
            Cancel
          </Button>
        </Group>
      </Paper>
    </form>
  )
}

export default BlogForm
