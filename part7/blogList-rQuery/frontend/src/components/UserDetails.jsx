import { Link, useParams } from 'react-router-dom'
import { getUser } from '../requests.js'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'react-bootstrap'

const UserDetails = () => {
  const { id } = useParams()
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  })

  if (isLoading) return <div>Getting user data...</div>
  if (error) return <div>Failed to get user data.</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      <Table striped hover>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserDetails
