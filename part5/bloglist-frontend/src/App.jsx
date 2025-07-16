import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
  }

  const handleBlogForm = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    const createdBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(createdBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    showNotification(`a new blog ${title} by ${author} was added`, 'success')
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  }

  const blogForm = () => (
    <form onSubmit={handleBlogForm}>
      <div>
        title:
        <input
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
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