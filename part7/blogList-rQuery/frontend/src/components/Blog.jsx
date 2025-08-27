import { useState } from 'react'
import PropTypes from 'prop-types'
import { useCanDeleteBlog } from '../userContext.jsx'

const Blog = ({ blog, incrementLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const canDeleteBlog = useCanDeleteBlog()

  const blogStyle = {
    padding: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 500,
  }

  return (
    <div style={blogStyle} className="blogContainer">
      <span data-testid="blog-title">{blog.title}</span> by {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className="expandedDetails">
        <p data-testid="blog-url">url: {blog.url}</p>
        <p data-testid="blog-likes">
          likes: <span data-testid="likes-count">{blog.likes}</span>
          <button onClick={() => incrementLikes(blog)}>like</button>
        </p>
        <p>user: {blog.user?.name}</p>
        {canDeleteBlog(blog) && (
          <button onClick={() => deleteBlog(blog.id)}>remove</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  incrementLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
}

export default Blog
