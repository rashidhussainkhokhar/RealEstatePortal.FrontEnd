
import React, { createContext, useContext, useState } from 'react'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [role, setRole] = useState(localStorage.getItem('role'))

  function login(tok, rl) {
    localStorage.setItem('token', tok)
    localStorage.setItem('role', rl || 'Buyer')
    setToken(tok)
    setRole(rl || 'Buyer')
  }
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setToken(null)
    setRole(null)
  }
  const value = { token, role, login, logout }
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export function useAuth() {
  return useContext(AuthCtx)
}
