import { useSelector } from 'react-redux'
import { Alert } from '@mantine/core'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  // const style = {
  //   textAlign: 'center',
  //   border: 'solid',
  //   padding: 10,
  //   borderWidth: 1,
  //   borderRadius: 6,
  //   margin: 4,
  //   backgroundColor:
  //     notification.type === 'success'
  //       ? 'lightgreen'
  //       : notification.type === 'error'
  //         ? 'salmon'
  //         : 'lightblue',
  // }

  return (
    <Alert variant="outline" color="lime" title={notification.type}>
      {notification.message}
    </Alert>
  )
}

export default Notification
