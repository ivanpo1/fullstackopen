import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from '@mantine/core'

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  )

  if (!user) {
    return <div>Loading user...</div>
  }

  const rows = user.blogs.map((blog) => (
    <Table.Tr key={blog.id}>
      <Table.Td>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <Table stickyHeader stickyHeaderOffset={60} striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th ta="center">Title</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  )
}

export default User
