import { useSelector } from 'react-redux'
import { Alert } from '@mantine/core'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  const color =
    notification.type === 'success'
      ? 'lime'
      : notification.type === 'error'
        ? 'red'
        : 'blue'

  return (
    <Alert
      variant="outline"
      color={color}
      title={
        notification.type.charAt(0).toUpperCase() +
        notification.type.slice(1).toLowerCase()
      }
      m="md"
    >
      {notification.message}
    </Alert>
  )
}

export default Notification
