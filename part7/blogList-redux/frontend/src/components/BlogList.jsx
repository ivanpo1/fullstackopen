import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from '@mantine/core'
import blogForm from './BlogForm.jsx'
import { useRef } from 'react'
import Togglable from './Togglable.jsx'
import BlogForm from './BlogForm.jsx'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm togglableRef={blogFormRef} />
    </Togglable>
  )

  const rows = blogs.map((blog) => (
    <Table.Tr key={blog.id}>
      <Table.Td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </Table.Td>
      <Table.Td>{blog.author}</Table.Td>
    </Table.Tr>
  ))

  return (
    <div>
      <h2>Blogs</h2>
      {blogForm()}
      <Table stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th bg="blue.3" c="dark.5" ta="center">
              Title
            </Table.Th>
            <Table.Th bg="blue.3" c="dark.5" ta="center">
              Author
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  )
}

export default BlogList
