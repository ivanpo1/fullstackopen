import { useNavigate, useParams } from 'react-router-dom'
import { getBlog } from '../requests.js'
import { useQuery } from '@tanstack/react-query'
import { useBlogActions } from '../hooks/useBlogActions.js'
import { useCanDeleteBlog } from '../userContext.jsx'
import CommentForm from './CommentForm.jsx'

const BlogDetails = () => {
  const { id } = useParams()
  const { handleLike, handleDeleteBlog } = useBlogActions()
  const canDeleteBlog = useCanDeleteBlog()
  const navigate = useNavigate()

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlog(id),
  })

  if (isLoading) return <div>Getting blog data...</div>
  if (error) return <div>Failed to get blog data.</div>
  if (!blog) {
    return null
  }

  const onDelete = async () => {
    await handleDeleteBlog(blog.id)
    navigate(-1)
  }

  const onLike = async () => {
    await handleLike(blog)
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} likes</p>
      <button onClick={onLike}>like</button>
      {canDeleteBlog(blog) && <button onClick={onDelete}>remove</button>}
      <p>added by {blog.user?.name}</p>
      <h3>Comments</h3>
      <div className="commentContainer">
        {blog.comments.map((comment, index) => (
          <li key={comment + index}>{comment}</li>
        ))}
      </div>
      <CommentForm id={blog.id} />
    </div>
  )
}

export default BlogDetails
