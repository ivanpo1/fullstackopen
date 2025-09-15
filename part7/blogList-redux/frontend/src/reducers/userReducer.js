import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs.js'
import { showNotification } from './notificationReducer.js'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(showNotification(`Welcome ${user.username}`, 'success'))
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (error) {
      dispatch(showNotification(`${error.response.data.error}`, 'error'))
    }
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(clearUser())
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
  }
}

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export default userSlice.reducer
