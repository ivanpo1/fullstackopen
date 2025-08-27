import { Link, useParams } from 'react-router-dom'
import { getUser } from '../requests.js'
import { useQuery } from '@tanstack/react-query'

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
      <h3>added blogs</h3>
      {user.blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </div>
  )
}

export default UserDetails
