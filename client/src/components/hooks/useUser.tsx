import {useContext, useCallback,useState} from 'react'
import Context from '../context/userContex'
import { UserContexType } from './type'
import loginService from "../fetch/login"
import addFav from '../fetch/addFavorite'


export const useUser = () => {
    const {jwt, setJWT,setFav} = useContext(Context) as UserContexType
    const [state, setState] = useState({loading:false,
    error: false})

    const login = useCallback((input:any)=>{
      setState({loading:true,error:false})
      loginService(input)
      .then(res=>{
        window.sessionStorage.setItem("jwt",JSON.stringify(res))
        setState({loading:false,error:false})
        setJWT(res)
      })
      .catch(err=>{
        window.sessionStorage.removeItem("jwt")
        setState({loading:false,error:true})
        console.error(err)
      })
    },[setJWT])


    const fav = useCallback((id:any)=>{
      const user = JSON.parse(window.sessionStorage.getItem("jwt")||"")
      console.log(user)
       const {token, email} = user
      addFav(email,id,token)
        .then((res:any)=>{
          setFav(res)
        })
        .catch((e:any)=>console.error(e))
    },[setFav]) 


    const logout = useCallback(()=>{
      window.sessionStorage.removeItem("jwt")
      setJWT(false)
    },[setJWT])

  return {
    isLogged:Boolean(jwt),
    isLoginLoading:state.loading,
    hasLoginError:state.error,
    login,
    logout,
    fav
  }
}
