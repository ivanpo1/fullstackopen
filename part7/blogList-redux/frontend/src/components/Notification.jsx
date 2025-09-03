import { useSelector } from 'react-redux'
import { Alert } from '@mantine/core'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  const color = notification.type === 'success' ? 'lime' : 'red'

  return (
    <Alert variant="outline" color={color} title={notification.type}>
      {notification.message}
    </Alert>
  )
}

export default Notification
