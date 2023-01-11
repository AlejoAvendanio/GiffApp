
import React, { useState, ReactNode,useEffect } from 'react'
import getFavs from '../fetch/getFavs'
// import { User } from '../hooks/type'



const Context = React.createContext({})

interface Props {
  children: ReactNode
}

export function UserContex ({children}:Props){
    const [jwt,setJWT] = useState<string | null>(()=>window.sessionStorage.getItem("jwt"))
    const [favs,setFav] = useState([])
    const [lastSearch,setLastSearch] = useState<string[]>([])
    const [trends, setTrends] = useState<string[]>([])
    const [lastSearchName,setLastSearchName] = useState<string>("")
    useEffect(()=>{
      if(!jwt) return setFav([])
      else{
        getFavs(jwt).then(setFav)
      }
    },[jwt])

  return (
    <Context.Provider value={{favs,jwt,setFav,setJWT,setLastSearch,lastSearch,setTrends,trends,lastSearchName,setLastSearchName}}>
      {children}
    </Context.Provider>
  )
}

export default Context