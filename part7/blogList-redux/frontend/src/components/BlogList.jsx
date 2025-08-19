import Blog from './Blog.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer.js'
import { showNotification } from '../reducers/notificationReducer.js'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog.id))
      dispatch(showNotification(`You liked ${blog.title}`, 'success', 1000))
    } catch (error) {
      dispatch(showNotification(`Error liking Blog: ${error}`, 'error'))
    }
  }

  const handleDelete = async (blog) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${blog.title}" by ${blog.author}?`
      )
    ) {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(showNotification('Blog deleted!', 'success'))
      } catch (error) {
        dispatch(showNotification(`Error deleting Blog: ${error}`, 'error'))
      }
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onLike={handleLike}
            onDelete={handleDelete}
            currentUser={user}
          />
        ))}
    </div>
  )
}

export default BlogList
