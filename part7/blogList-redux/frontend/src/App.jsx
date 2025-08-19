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

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

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
    <div>
      <div>
        <p className="userLogged">{user.name} logged-in</p>
        <Notification />
        <BlogList />
        <button
          onClick={() => {
            dispatch(logoutUser())
            dispatch(showNotification('See you later Aligator'))
          }}
        >
          Logout
        </button>
        {blogForm()}
      </div>
    </div>
  )
}

export default App
