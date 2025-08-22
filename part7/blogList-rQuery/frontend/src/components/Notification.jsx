import { useNotification } from '../NotificationContext.jsx'

const Notification = () => {
  const notification = useNotification()

  if (notification === null) {
    return null
  }

  return <div className={'notification'}>{notification}</div>
}

export default Notification
