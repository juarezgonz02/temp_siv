import { Outlet } from 'react-router-dom'
import Context, { AuthContext } from '../utils/AuthContext'
import { ReactNode, useContext } from 'react'
import { useGoogleOneTapLogin } from '@react-oauth/google';


const OneTapLog = ({children}:({children: ReactNode})) => {

  const [token] = useContext(AuthContext).token

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log('Login Failed');
    },
    disabled: true
  }); 

  return children

}

const AuthMiddleware = () => {

  return (

    <Context>
      <OneTapLog >
        <Outlet />
      </OneTapLog>

    </Context>
  )
}

export default AuthMiddleware