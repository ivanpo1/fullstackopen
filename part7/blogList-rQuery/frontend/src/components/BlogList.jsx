import { useQuery } from '@tanstack/react-query'
import { getAllBlogs } from '../requests.js'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useRef } from 'react'
import Togglable from './Togglable.jsx'
import BlogForm from './BlogForm.jsx'

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
  })
  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable
      buttonLabel="Add new Blog"
      buttonClass="createBlogButton"
      ref={blogFormRef}
    >
      <BlogForm />
    </Togglable>
  )

  if (result.isLoading) {
    return <div>Loading data...</div>
  }
  const blogs = result.data

  return (
    <div>
      <h2>Blogs</h2>
      {blogForm()}
      <Table striped hover>
        <tbody>
          {blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
