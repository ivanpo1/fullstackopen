import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../requests.js'
import { Link } from 'react-router-dom'

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
    <table>
      <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
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
    </table>
  )
}

export default UserList
