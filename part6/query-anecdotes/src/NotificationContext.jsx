import { createContext, useReducer, useContext  } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return `The anecdote '${action.payload}' was added`
    case "VOTE":
      return `You voted '${action.payload}'`
    case "CLEAR":
      return null
    case "ERROR":
      return `Error: ${action.payload}`
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const showNotification = (message, type) => {
    notificationDispatch({ type, payload: message })
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