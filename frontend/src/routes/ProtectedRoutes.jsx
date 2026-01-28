import React, { useContext } from 'react'
import { Auth } from '../context/AuthContext'
import { Navigate, replace } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    let {user} =useContext(Auth)
    if(user){
        return children
    }
    else{
       return <Navigate to="/login" replace />
    }
}

export default ProtectedRoutes
