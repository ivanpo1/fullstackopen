import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return {
        message: action.payload.message,
        type: action.payload.type || 'info',
      }
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  const showNotification = (message, type = 'info') => {
    notificationDispatch({ type: 'SET', payload: { message, type } })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, showNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useShowNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
