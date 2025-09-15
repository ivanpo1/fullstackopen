import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer.js'
import { useState } from 'react'
import { showNotification } from '../reducers/notificationReducer.js'
import { Button, Group, Paper, PasswordInput, TextInput } from '@mantine/core'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    // setUsername('')
    // setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <Paper shadow="sm" radius="md" withBorder p="xl" m="md">
        <TextInput
          label="Username"
          aria-label="Username"
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <PasswordInput
          label="Password"
          aria-label="Password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <Group grow mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </Paper>
    </form>
  )
}

export default Login
