import React, { createContext, useEffect, useState } from 'react';

// إنشاء Context
export const authContext = createContext();

export  function AuthProvider  ({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if(localStorage.getItem('userToken') !== null){
        setToken(localStorage.getItem('userToken'));
    }

  } , []) //handle User refresh



  return  <authContext.Provider value={{ token, setToken }}>
            {children}
         </authContext.Provider>
  ;
};