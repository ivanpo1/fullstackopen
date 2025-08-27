import { useQuery } from '@tanstack/react-query'
import { getAllBlogs } from '../requests.js'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }
  const blogs = result.data

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
    </div>
  )
}

export default BlogList
