import { Link, useNavigate, useParams } from 'react-router-dom'
import { getBlog } from '../requests.js'
import { useQuery } from '@tanstack/react-query'
import { useBlogActions } from '../hooks/useBlogActions.js'
import { useCanDeleteBlog } from '../userContext.jsx'
import CommentForm from './CommentForm.jsx'
import Button from 'react-bootstrap/Button'

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
    <div className="blogContainer">
      <div className="blogDetails">
        <h2>{blog.title}</h2>
        <p>{blog.url}</p>
        <p>
          <span>&#128077;</span>
          <span className="numberLikes">{blog.likes}</span> likes
          <Button variant="success" className="likeButton" onClick={onLike}>
            like
          </Button>
        </p>
        {blog.user && (
          <p>
            added by{' '}
            <Link to={`/users/${blog.user.id}`}>{blog.user?.name}</Link>
          </p>
        )}
        {canDeleteBlog(blog) && (
          <Button variant="dark" className="deleteButton" onClick={onDelete}>
            remove
          </Button>
        )}
        <CommentForm id={blog.id} />
      </div>
      <div className="commentSection">
        <h3>Comments</h3>
        <div className="commentContainer">
          {blog.comments.map((comment, index) => (
            <li className="comment" key={comment + index}>
              {comment}
            </li>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogDetails
