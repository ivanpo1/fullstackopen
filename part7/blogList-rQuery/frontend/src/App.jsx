import { useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable.jsx'
import BlogForm from './components/BlogForm.jsx'
import BlogList from './components/BlogList.jsx'
import { useShowNotification } from './NotificationContext.jsx'
import { useUser, useUserLogout } from './userContext.jsx'
import Login from './components/Login'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UserList from './components/UserList.jsx'
import UserDetails from './components/UserDetails.jsx'

const App = () => {
  const user = useUser()
  const userLogout = useUserLogout()
  const showNotification = useShowNotification()

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  const handleLogout = () => {
    userLogout()
    showNotification('Logged out!')
  }

  console.log('USER', user)

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
      <div>
        <Notification />
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>Logout</button>

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <BlogList user={user} />
                  {blogForm()}
                </>
              }
            />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
