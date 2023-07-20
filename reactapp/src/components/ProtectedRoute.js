import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function ProtectedRoute({children}) {
    const {user}=useAuth();
    if(user===false){
       return  <Navigate to="auth/login" replace={true}/>;
    }
    
    return children;
}

export default ProtectedRoute