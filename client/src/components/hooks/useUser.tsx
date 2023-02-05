import {useContext, useCallback,useState} from 'react'
import Context from '../context/userContex'
import { UserContexType } from './type'
import loginService, { user } from "../fetch/login"
import addFav from '../fetch/addFavorite'
import { getInfoById, searchId } from '../fetch/useFetch'
import { UseRandom } from '../fetch/random'


export type Favorite ={
  id:string,
  url:string,
  shared:string,
  title:string
}

export const useUser = () => {
    const {jwt, setJWT,setFav,favs} = useContext(Context) as UserContexType
    const [state, setState] = useState({loading:false,
    error: false})
    const [logins, setLogins] = useState(false)
    const [gifId,setGifId] = useState("")

    const login = useCallback((input:any)=>{
      setState({loading:true,error:false})
      return loginService(input)
      .then(res=>{
        window.sessionStorage.setItem("jwt",JSON.stringify(res))
        localStorage.setItem("user",input)
        setState({loading:false,error:false})
        setJWT(res.token)
        setLogins(logins)
        return true
      })
      .catch(err=>{
        window.sessionStorage.removeItem("jwt")
        localStorage.removeItem("user")
        setState({loading:false,error:true})
        console.error(err)
      })
    },[setJWT,logins])


    const fav = useCallback((gif:Favorite)=>{
      addFav(gif,jwt)
      .then((res:Favorite[])=>{
          console.log(res)
          setFav(res)
          window.localStorage.setItem("favs",JSON.stringify(favs))
        })
        .catch((e:any)=>console.error(e))
    },[setFav,favs]) 

    const logout = useCallback(()=>{
      window.sessionStorage.removeItem("jwt")
      setJWT("")
    },[setJWT])


    const detailFunction = useCallback((id:searchId)=>{
      getInfoById(id).then(gif=>setGifId(gif))
    },[]
    )

  return {
    isLogged:Boolean(jwt),
    isLoginLoading:state.loading,
    hasLoginError:state.error,
    login,
    logout,
    fav,
    favs,
    gifId,
    detailFunction
  }
}
