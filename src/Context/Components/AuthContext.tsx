import { createContext } from "react";
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

export let AuthContext=createContext(null);

export default function AuthContextProvider(props:any){
    const [loginData,setLoginData]=useState(null);
    let baseUrl=`https://upskilling-egypt.com:3003/api/v1`;
    let requestHeader={
        Authorization:`Bearer ${localStorage.getItem("userToken")}`
      }

    const saveLoginData=()=>{
      const encodedToken:any=localStorage.getItem("userToken");
      const decodedToken:any=jwtDecode(encodedToken);
      setLoginData(decodedToken);
      localStorage.setItem('loginData',JSON.stringify(decodedToken));    
    }
    useEffect(()=>{
      if(localStorage.getItem("userToken")){
        saveLoginData();
      }
    },[])

    return <AuthContext.Provider value={{loginData,baseUrl,requestHeader}}>
        {props.children}
    </AuthContext.Provider>
}