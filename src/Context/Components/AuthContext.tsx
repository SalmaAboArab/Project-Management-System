import { createContext, useEffect } from "react";
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

export let AuthContext=createContext(null);

export default function AuthContextProvider(props:any){
    const [loginData,setLoginData]=useState(null);
    const [userRole,setUserRole]=useState<string>('');
    useEffect(() => {
      if (localStorage.getItem("userToken")) {
        
        saveLoginData()
      }
      
    }, [])
    
    const saveLoginData=()=>{
      const encodedToken:any=localStorage.getItem("userToken");
      const decodedToken:any=jwtDecode(encodedToken);      
      setLoginData(decodedToken);
      localStorage.setItem('loginData',JSON.stringify(decodedToken));  
      setUserRole(decodedToken?.userGroup);  
    }
    

    return <AuthContext.Provider value={{loginData,saveLoginData,userRole}}>
        {props.children}
    </AuthContext.Provider>
}