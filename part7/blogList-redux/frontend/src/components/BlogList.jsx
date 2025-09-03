import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Mark, Table } from '@mantine/core'
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

  const rows = blogs
    .toSorted((a, b) => b.likes - a.likes)
    .map((blog) => (
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
      <Table stickyHeader stickyHeaderOffset={60} striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th fz="lg" c="dark.1" ta="center">
              <Mark>Title</Mark>
            </Table.Th>
            <Table.Th fz="lg" c="dark.1" ta="center">
              <Mark color="orange">Author</Mark>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  )
}

export default BlogList
