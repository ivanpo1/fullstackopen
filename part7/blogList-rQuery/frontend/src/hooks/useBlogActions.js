import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addComment, deleteBlog, updateBlog } from '../requests.js'
import { useShowNotification } from '../NotificationContext.jsx'

export const useBlogActions = () => {
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
    mutationFn: (id) => deleteBlog(id),
    onSuccess: (_, id) => {
      const cachedBlog = queryClient.getQueryData(['blog', id])
      const userId = cachedBlog?.user?.id

      queryClient.setQueryData(['blogs'], (old) =>
        Array.isArray(old) ? old.filter((b) => b.id !== id) : old
      )

      if (userId) {
        queryClient.setQueryData(['user', userId], (oldUser) =>
          oldUser
            ? { ...oldUser, blogs: oldUser.blogs.filter((b) => b.id !== id) }
            : oldUser
        )
      }

      showNotification('Blog deleted!', 'success')
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: ({ blogId, comment }) => addComment(blogId, comment),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(['blog', updatedBlog.id], updatedBlog)
      queryClient.setQueryData(['blogs'], (oldBlogs) =>
        oldBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      )
    },
  })

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    queryClient.setQueryData(['blog', blog.id], updatedBlog)

    try {
      updateBlogMutation.mutate(updatedBlog)
    } catch (error) {
      queryClient.setQueryData(['blog', blog.id], blog)
      console.log('failed to update blog', error)
    }
  }

  const handleDeleteBlog = async (id) => {
    if (window.confirm()) {
      try {
        deleteBlogMutation.mutate(id)
      } catch (error) {
        showNotification(error, 'error')
      }
    }
  }

  const handleAddComment = (blogId, comment) => {
    console.log('blogID', blogId)
    addCommentMutation.mutate({ blogId, comment })
  }

  return { handleLike, handleDeleteBlog, handleAddComment }
}
