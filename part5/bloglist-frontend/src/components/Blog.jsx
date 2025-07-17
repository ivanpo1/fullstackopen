import { useState } from "react";

const Blog = ({ blog, incrementLikes, deleteBlog, currentUser }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    padding: 4,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: 500,
  }

  console.log('BLOG:', blog)

  return (
    <div style={blogStyle}>
    <i>{blog.title}</i> by {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        <p>url: {blog.url}</p>
        <p>likes: {blog.likes} <button onClick={() => incrementLikes(blog)}>like</button></p>
        <p>user: {blog.user?.name}</p>
        {currentUser && blog.user && (currentUser.id === blog.user.id) &&
          <button onClick={() => deleteBlog(blog.id)}>remove</button>
        }
      </div>
    </div>
  )
}
export default Blog