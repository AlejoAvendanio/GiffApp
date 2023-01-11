import {useContext, useCallback,useState} from 'react'
import Context from '../context/userContex'
import { UserContexType } from './type'
import loginService from "../fetch/login"
import addFav from '../fetch/addFavorite'


export const useUser = () => {
    const {jwt, setJWT,setFav,favs} = useContext(Context) as UserContexType
    const [state, setState] = useState({loading:false,
    error: false})
    const [logins, setLogins] = useState(false)
    const login = useCallback((input:any)=>{
      setState({loading:true,error:false})
      return loginService(input)
      .then(res=>{
        window.sessionStorage.setItem("jwt",JSON.stringify(res))
        setState({loading:false,error:false})
        setJWT(res.token)
        setLogins(logins)
        return true
      })
      .catch(err=>{
        window.sessionStorage.removeItem("jwt")
        setState({loading:false,error:true})
        console.error(err)
      })
    },[setJWT,logins])


    const fav = useCallback((id:any)=>{
      const token = window.sessionStorage.getItem("jwt") || ""
      addFav(id,token)
        .then((res:any)=>{
          setFav(res)
        })
        .catch((e:any)=>console.error(e))
    },[setFav]) 


    const logout = useCallback(()=>{
      window.sessionStorage.removeItem("jwt")
      setJWT("")
    },[setJWT])

  return {
    isLogged:Boolean(jwt),
    isLoginLoading:state.loading,
    hasLoginError:state.error,
    login,
    logout,
    fav,
    favs
  }
}
