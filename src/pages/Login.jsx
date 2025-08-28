
import React, { useState } from 'react'
import api from '../api'
import { useAuth } from '../state/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography, Paper } from '@mui/material'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const nav = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/login', { email, password })
      login(data.token, data.role)
      nav('/')
    } catch {
      setError('Invalid credentials')
    }
  }

  return (
    <Paper sx={{ p:3, maxWidth: 420, mx:'auto' }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      {error && <Typography color="error" sx={{ mb:1 }}>{error}</Typography>}
      <Box component="form" onSubmit={onSubmit}>
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e=>setPassword(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth sx={{ mt:2 }}>Login</Button>
      </Box>
    </Paper>
  )
}
