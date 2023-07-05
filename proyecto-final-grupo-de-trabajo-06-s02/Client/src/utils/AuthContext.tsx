/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ReactNode, createContext, useEffect, useState } from "react";

interface AuthInfo {
    clear: () => void
    img: [string |undefined, (v: string |undefined)=>void]
    name: [string |undefined, (v: string |undefined)=>void]
    email: [string |undefined, (v: string |undefined)=>void]
    token: [string |undefined, (v: string |undefined)=>void]
    permission: [ (string)[], (a: (string)[])=>void]
}
export const AuthContext = createContext<AuthInfo>(null)

const Creation = ({children}:({children: ReactNode })) => {
  
    
    const imgState = useState<string>();
    const permission = useState<(string)[]>([]);
    const nameState = useState<string>();
    const emailState = useState<string>();
    const tokenState = useState<string>();

    const [permissions, setPermission] = permission;
    const [, setImg] = imgState;
    const [, setEmail] = emailState;
    const [token, setToken] = tokenState;
    const [name, setName] = nameState;
    
    const clearInfo = () => { 
        setPermission([])
        setEmail(undefined)
        setToken(undefined)
        setName(undefined)
        setImg(undefined)
     }
    const store: AuthInfo = {

        clear: clearInfo,
        name: nameState,
        email: emailState,
        img: imgState,
        permission: permission,
        token: tokenState
    }

    useEffect(() => { 
        const tk = localStorage.getItem("token") || undefined

        console.log(tk)
        setToken(tk)

        const nm = localStorage.getItem("name") || undefined
        setName(nm)

        const pr = JSON.parse(localStorage.getItem("permission") || "[]" )
        setPermission(pr)
     },[])

     useEffect(() => { 
         if(token != undefined && name != undefined){    
            localStorage.setItem("token", token)
            localStorage.setItem("name", name)
        }
     },[token])

     useEffect(() => { 
        if(permissions == undefined){
            return 
        }
        
        if(permissions.length != 0 ){
            localStorage.setItem("permission", JSON.stringify(permissions))
        }
      },[permissions])


    return (
        <AuthContext.Provider value={store}>
            {children}
        </AuthContext.Provider>
    )
}

export default Creation