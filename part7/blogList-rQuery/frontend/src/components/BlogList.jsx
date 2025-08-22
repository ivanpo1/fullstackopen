import Blog from './Blog.jsx'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteBlog, getBlogs, updateBlog } from '../requests.js'
import { useShowNotification } from '../NotificationContext.jsx'

const BlogList = ({ user }) => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  })

  const showNotification = useShowNotification()

  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
      )
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (id) => {
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.filter((b) => b.id !== id)
      )
      showNotification('Blog deleted!')
    },
  })

  const handleLikes = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    try {
      updateBlogMutation.mutate(updatedBlog)
    } catch (error) {
      console.log('failed to update blog', error)
    }
  }

  const handleDeleteBlog = async (id) => {
    if (window.confirm()) {
      try {
        deleteBlogMutation.mutate(id)
      } catch (error) {
        showNotification(error)
      }
    }
  }

  if (result.isLoading) {
    return <div>Loading data...</div>
  }
  const blogs = result.data

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            incrementLikes={handleLikes}
            deleteBlog={handleDeleteBlog}
            currentUser={user}
          />
        ))}
    </div>
  )
}

export default BlogList
