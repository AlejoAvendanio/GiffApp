import React, { useState, ReactNode } from 'react'
import { User } from '../hooks/type'



const Context = React.createContext({})

interface Props {
  children: ReactNode
}

export function UserContex ({children}:Props){
    const [jwt,setJWT] = useState(()=>window.sessionStorage.getItem("jwt"))
    const [fav,setFav] = useState()
  return (
    <Context.Provider value={{fav,jwt,setFav,setJWT}}>
      {children}
    </Context.Provider>
  )
}

export default Context