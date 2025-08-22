import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../requests.js'
import User from './User.jsx'

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
          <User key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  )
}

export default UserList
