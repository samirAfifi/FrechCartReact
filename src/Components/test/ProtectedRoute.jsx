import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { authContext } from '../../Context/Context';

export default function ProtectedRoute({children}) {
   const{token}= useContext(authContext);
   if(token===null){
    return <Navigate to='/Login' />

   }
   console.log('token');
  return <>
  {children}
  </>
    
  
}
