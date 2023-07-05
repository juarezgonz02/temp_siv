import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../utils/AuthContext'
import {useContext, useEffect} from "react"

const AccountMiddleware = () => {

  const [username] = useContext(AuthContext).name
  const [token] = useContext(AuthContext).token
  const nav = useNavigate()
  
  console.log(username, token)

  useEffect(() => { 
    
      if(token == undefined || username == undefined){
          nav("/login")
        } 
    },[])

  return (
    <Outlet />
  )
}

export default AccountMiddleware