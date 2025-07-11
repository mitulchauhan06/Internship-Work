import React from 'react'
import {Navigate} from "react-router-dom"
import {useAuth} from "../hooks/useAuth"
const Protectedroute = ({children}) => {

    const {user} = useAuth();  // useAuth is a custom hook that provide the user data globally

    if(!user){
        return <Navigate to="/login" replace={true}/>
    }
  return (
    children
  )
}

export default Protectedroute
