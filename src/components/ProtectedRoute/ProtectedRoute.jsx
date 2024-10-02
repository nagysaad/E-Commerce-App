import React from 'react'
import { useContext } from 'react';
import { authContext } from '../../context/authenticate';
import Login from '../Login/Login';
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute( {children}) {

    const {token} = useContext(authContext);
    

    if (token === null && !localStorage.getItem("userToken")  ){

     return <Navigate to={"/login"} />
     
      // return <Login />
      //return <h2>You Are Not Authenticated to Acess This Page Please Signin and Try Again</h2>
    }

  return (
    <div>

        {children}
     
      
    </div>
  )

}
