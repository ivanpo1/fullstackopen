import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from "./components/Togglable.jsx";
import BlogForm from "./components/BlogForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification('Logged in!', 'success')
    } catch (exception) {
      console.log(exception)
      showNotification('Wrong credentials', 'error')
    }
  }

  const handleLogout = () => {
    blogService.setToken(null)
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    showNotification('Logged out!', 'success')
  }

  const createBlog = async (blogObject) => {
    try {
      blogObject = {
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
      }
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      showNotification(`a new blog ${blogObject.title} by ${blogObject.author} was added`, 'success')

      return true
    } catch (error) {
      showNotification(`Failed to create blog post ${error}`, 'error')
      return false
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )


  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>

          <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog}/>
            )}
          </div>
          <button onClick={handleLogout}>Logout</button>
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App