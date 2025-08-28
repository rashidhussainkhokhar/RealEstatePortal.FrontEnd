
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Search from './pages/Search.jsx'
import Detail from './pages/Detail.jsx'
import Favorites from './pages/Favorites.jsx'
import { AuthProvider, useAuth } from './state/AuthContext.jsx'
import { AppBar, Toolbar, Button, Container, Typography } from '@mui/material'

function Protected({ children }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return children
}

function Layout() {
  const { token, logout } = useAuth()
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Real Estate</Typography>
          <Button color="inherit" component={Link} to="/">Search</Button>
          {token && <Button color="inherit" component={Link} to="/favorites">My Favorites</Button>}
          {token
            ? <Button color="inherit" onClick={logout}>Logout</Button>
            : <>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
              </>
          }
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties/:id" element={<Detail />} />
          <Route path="/favorites" element={<Protected><Favorites /></Protected>} />
        </Routes>
      </Container>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
