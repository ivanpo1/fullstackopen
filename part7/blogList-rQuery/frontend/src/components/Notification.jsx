import { useNotification } from '../NotificationContext.jsx'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useNotification()

  if (notification === null) {
    return null
  }

  // return <div className={'notification'}>{notification}</div>
  return <Alert variant={notification.type}>{notification.message}</Alert>
}

export default Notification
