import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../requests.js'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  })

  if (isLoading) return <div>User data loading...</div>
  if (error) return <div>Error fetching users</div>

  return (
    <div>
      <h2>User List</h2>
      <Table striped hover>
        <tbody>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
