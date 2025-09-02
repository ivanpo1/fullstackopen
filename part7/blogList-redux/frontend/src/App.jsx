import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable.jsx'
import BlogForm from './components/BlogForm.jsx'

import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer.js'
import { initializeBlogs } from './reducers/blogReducer.js'
import BlogList from './components/BlogList.jsx'
import Login from './components/Login.jsx'
import { initializeUser, logoutUser } from './reducers/userReducer.js'
import UserList from './components/UserList.jsx'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'
import Blog from './components/Blog.jsx'
import { initializeUsers } from './reducers/usersReducer.js'
import User from './components/User.jsx'
import { Button, Group, Text, Container, Paper } from '@mantine/core'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <Router>
      <Container size="lg">
        <Paper shadow="md" p="md" bg="dark.7" c="white">
          <Group justify="space-between">
            <Group>
              <Link to="/users" className="nav-link">
                Users
              </Link>
              <Link to="/blogs" className="nav-link">
                Blogs
              </Link>
            </Group>

            <Group>
              <Text fs="italic">
                <Link to={`/users/${user.id}`} className="nav-link">
                  {user.name}
                </Link>{' '}
                logged-in
              </Text>
              <Button
                variant="filled"
                color="gray"
                onClick={() => {
                  dispatch(logoutUser())
                  dispatch(showNotification('See you later Aligator'))
                }}
              >
                Logout
              </Button>
            </Group>
          </Group>
        </Paper>

        <Notification />
        <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs" element={<BlogList />} />

          <Route
            path="/users"
            element={user ? <UserList /> : <Navigate replace to="/login" />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
