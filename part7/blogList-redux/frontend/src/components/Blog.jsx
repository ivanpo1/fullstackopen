import { deleteBlog, likeBlog } from '../reducers/blogReducer.js'
import { showNotification } from '../reducers/notificationReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import CommentForm from './CommentForm.jsx'
import { Box, Button, Center, Container, Paper } from '@mantine/core'

const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog.id))
    } catch (error) {
      dispatch(showNotification(`Error liking Blog: ${error}`, 'error'))
    }
  }

  if (!blog) return <div>Loading blog data...</div>

  return (
    <div className="blogContainer">
      <div className="blogDetails">
        <Paper bg="dark.6" shadow="xl" radius="lg" p="md" ta="center">
          <h2>{blog.title}</h2>
          <p>{blog.url}</p>
          <p>
            <span className="numberLikes">{blog.likes}</span> likes
            <Button
              ml="md"
              radius="lg"
              variant="outline"
              color="lime"
              onClick={() => handleLike(blog)}
            >
              like
            </Button>
          </p>
          {blog.user && (
            <p>
              added by{' '}
              <Link to={`/users/${blog.user.id}`}>{blog.user?.name}</Link>
            </p>
          )}
        </Paper>
        <CommentForm id={blog.id} />
      </div>
      <div className="commentSection">
        <Center fz="xl" m="xs">
          Comments
        </Center>
        <Container size={1200}>
          <div className="commentContainer">
            {blog.comments.map((comment, index) => (
              <Paper
                bg="gray.4"
                key={comment + index}
                shadow="sm"
                radius="xl"
                p="xs"
                mt="xs"
                c="dark.5"
              >
                <Box ml="md">{comment}</Box>
              </Paper>
            ))}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Blog
