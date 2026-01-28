import React, { useContext } from 'react'
import { Auth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminRoutes = ({ children }) => {
  const { user } = useContext(Auth)

  if (user && user.role === "admin") {
    return children
  } else {
    return <Navigate to="/" replace />
  }
}

export default AdminRoutes
