
import React, { useState, ReactNode,useEffect } from 'react'
import getFavs from '../fetch/getFavs'
// import { User } from '../hooks/type'



const Context = React.createContext({})

interface Props {
  children: ReactNode
}

export function UserContex ({children}:Props){
    const [jwt,setJWT] = useState(()=>window.sessionStorage.getItem("jwt"))
    const [favs,setFav] = useState([])
    useEffect(()=>{
      if(!jwt) return setFav([])
      else{
        getFavs(jwt).then(setFav)
      }
    },[jwt])

  return (
    <Context.Provider value={{favs,jwt,setFav,setJWT}}>
      {children}
    </Context.Provider>
  )
}

export default Context