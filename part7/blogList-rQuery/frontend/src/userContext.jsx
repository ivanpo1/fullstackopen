import { createContext, useReducer, useContext, useEffect } from 'react'
import loginService from './services/login'
import { setToken } from './requests.js'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const UserContext = createContext()

const initUser = () => {
  const savedUser = window.localStorage.getItem('loggedUser')
  return savedUser ? JSON.parse(savedUser) : null
}

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null, initUser)

  useEffect(() => {
    if (user) {
      setToken(user.token)
    }
  }, [user])

  const canDeleteBlog = (blog) => user && blog.user && user.id === blog.user.id

  return (
    <UserContext.Provider value={[user, userDispatch, canDeleteBlog]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useCanDeleteBlog = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[2]
}

export const useUserLogin = () => {
  const userAndDispatch = useContext(UserContext)
  const dispatch = userAndDispatch[1]
  return async (payload) => {
    const user = await loginService.login(payload)
    // setToken(user.token)
    dispatch({ type: 'SET', payload: user })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
  }
}

export const useUserLogout = () => {
  const userAndDispatch = useContext(UserContext)
  const dispatch = userAndDispatch[1]
  return () => {
    setToken(null)
    window.localStorage.removeItem('loggedUser')
    dispatch({ type: 'CLEAR' })
  }
}

export default UserContext
