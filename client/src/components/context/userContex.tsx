
import React, { useState, ReactNode,useEffect } from 'react'
import getFavs from '../fetch/getFavs'
import { Gifs } from '../list/listOfGifs'
// import { User } from '../hooks/type'



const Context = React.createContext({})

interface Props {
  children: ReactNode
}

export function UserContex ({children}:Props){
    const [jwt,setJWT] = useState<string | null>(()=>window.sessionStorage.getItem("jwt"))
    const [favs,setFav] = useState([])
    const [lastSearch,setLastSearch] = useState<Gifs[]>([])
    const [chatSelected,setChatSelected]= useState<object | null>(null)
    const [trends, setTrends] = useState<Gifs[]>([])
    const [lastSearchName,setLastSearchName] = useState<string>("")
    const [chats, setChats] = useState()
    const [chatInfo,setChatInfo] = useState<any>("")
    useEffect(()=>{
      // const userInfo = JSON.parse(localStorage.getItem("user") || "")
      // setUser(userInfo)
      if(!jwt) return setFav([])
      else{
        getFavs(jwt).then(setFav)
      }
    },[jwt])

  return (
    <Context.Provider 
    value={{
      chatInfo,
      setChatInfo,
      favs,
      jwt,
      setFav,
      setJWT,
      setLastSearch,
      lastSearch,
      setTrends,
      trends,
      lastSearchName,
      setLastSearchName,
      chats,
      setChats,
      chatSelected,
      setChatSelected
      }}>
      {children}
    </Context.Provider>
  )
}

export default Context