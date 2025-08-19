import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer.js'
import { showNotification } from '../reducers/notificationReducer.js'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await dispatch(createBlog({ title, author, url }))
      dispatch(
        showNotification(`New blog: '${newBlog.title}' was added.`, 'success')
      )
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      dispatch(showNotification(`Error creating blog: ${error}`, 'error'))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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

// BlogForm.propTypes = {
//   createBlog: PropTypes.func.isRequired,
// }

export default BlogForm
