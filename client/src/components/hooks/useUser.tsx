import {useContext, useCallback,useState} from 'react'
import Context from '../context/userContex'
import { UserContexType } from './type'
import loginService from "../fetch/login"
import addFav from '../fetch/addFavorite'
import { getInfoById } from '../fetch/useFetch'
import { UseRandom } from '../fetch/random'


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


    // const random = useCallback((e:any)=>{
    //   UseRandom().then((res)=>setRandom(res))
      
    // },[])

    const fav = useCallback((gif:any)=>{
      const token = window.sessionStorage.getItem("jwt") || ""
      console.log(gif)
      addFav(gif,token)
        .then((res:any)=>{
          setFav(res)
          window.localStorage.setItem("favs",JSON.stringify(favs))
        })
        .catch((e:any)=>console.error(e))
    },[setFav,favs]) 

    const logout = useCallback(()=>{
      window.sessionStorage.removeItem("jwt")
      setJWT("")
    },[setJWT])


    const detailFunction = useCallback((id:string)=>{
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
