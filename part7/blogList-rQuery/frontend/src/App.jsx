import { useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable.jsx'
import BlogForm from './components/BlogForm.jsx'
import BlogList from './components/BlogList.jsx'
import { useShowNotification } from './NotificationContext.jsx'
import { useUser, useUserLogout } from './userContext.jsx'
import Login from './components/Login'
import Button from 'react-bootstrap/Button'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UserList from './components/UserList.jsx'
import UserDetails from './components/UserDetails.jsx'
import BlogDetails from './components/BlogDetails.jsx'
import { Container, Nav, Navbar } from 'react-bootstrap'

const App = () => {
  const user = useUser()
  const userLogout = useUserLogout()
  const showNotification = useShowNotification()

  const handleLogout = () => {
    userLogout()
    showNotification('Logged out!')
  }

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
      <div className="container">
        <div>
          <div>
            <Navbar className="bg-body-tertiary">
              <Container>
                <Navbar.Brand>BlogList</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-between">
                  <Nav>
                    <Nav.Link as={Link} to="/users">
                      Users
                    </Nav.Link>
                    <Nav.Link as={Link} to="/blogs">
                      Blogs
                    </Nav.Link>
                  </Nav>

                  <Nav className="align-items-center gap-3">
                    <Navbar.Text className="d-none d-sm-block m-0">
                      Signed in as:{' '}
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </Navbar.Text>
                    <Nav.Link
                      as={Link}
                      to="#"
                      onClick={handleLogout}
                      className="p-0"
                    >
                      Logout
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <Notification />

            <Routes>
              <Route path="/blogs" element={<BlogList user={user} />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
