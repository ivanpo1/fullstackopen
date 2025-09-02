import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from '@mantine/core'

const UserList = () => {
  const users = useSelector((state) => state.users)

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </Table.Td>
      <Table.Td>{user.blogs.length}</Table.Td>
    </Table.Tr>
  ))

  return (
    <div>
      <h2>Users</h2>
      <Table stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th ta="center">User</Table.Th>
            <Table.Th ta="center"># of Blogs added</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  )
}

export default UserList
