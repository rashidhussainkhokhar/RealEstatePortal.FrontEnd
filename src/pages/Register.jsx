
import React, { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Buyer')
  const [msg, setMsg] = useState('')
  const nav = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    setMsg('')
    try {
      await api.post('/auth/register', { email, password, role })
      setMsg('Registered. You can login now.')
      setTimeout(()=> nav('/login'), 800)
    } catch {
      setMsg('Registration failed')
    }
  }

  return (
    <Paper sx={{ p:3, maxWidth: 480, mx:'auto' }}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      {msg && <Typography sx={{ mb:1 }}>{msg}</Typography>}
      <Box component="form" onSubmit={onSubmit}>
        <TextField fullWidth label="Email" margin="normal" value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={e=>setPassword(e.target.value)} />
        <TextField fullWidth select label="Role" margin="normal" value={role} onChange={e=>setRole(e.target.value)}>
          <MenuItem value="Buyer">Buyer</MenuItem>
          <MenuItem value="Public">Public</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" fullWidth sx={{ mt:2 }}>Register</Button>
      </Box>
    </Paper>
  )
}
