import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({isAuthenticated, children}) => {
    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }
   
  return children?children:<Outlet/>
    
  
};

export default ProtectedRoutes
