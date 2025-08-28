import { useUserLogin } from '../userContext.jsx'
import { useShowNotification } from '../NotificationContext.jsx'
import { useState } from 'react'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = useUserLogin()
  const showNotification = useShowNotification()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await userLogin({ username, password })
      setUsername('')
      setPassword('')
      showNotification('Logged in!', 'success')
    } catch (exception) {
      console.log(exception)
      showNotification('Wrong credentials', 'danger')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
