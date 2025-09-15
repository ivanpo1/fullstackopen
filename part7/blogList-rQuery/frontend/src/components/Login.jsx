import { useUserLogin } from '../userContext.jsx'
import { useShowNotification } from '../NotificationContext.jsx'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    <Container className="mt-4" style={{ maxWidth: '400px' }}>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default Login
