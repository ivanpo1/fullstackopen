import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
    margin: 4,
    backgroundColor:
      notification.type === 'success'
        ? 'lightgreen'
        : notification.type === 'error'
          ? 'salmon'
          : 'lightblue',
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification
