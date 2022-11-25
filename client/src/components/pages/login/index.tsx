import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router'
import { useUser } from '../../hooks/useUser'

interface user {
    email:string,
    password:string
}

export const Login = () => {
    const navigate = useNavigate()
    const {hasLoginError,isLoginLoading,login, isLogged} = useUser()
    const [input, setInput] = useState<user>({
        email:"",
        password:""
    })

    useEffect(()=>{
        if(isLogged) navigate("/")
    },[isLogged,navigate])
    
    const handleChance = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInput({...input,
        [e.target.name] : e.target.value})
        }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        login(input)
    }
    // if(isLoginLoading) return
  return (
    <div>
        <h2>Login</h2>
        {
            isLoginLoading && <strong>Checking credentials...</strong>
        }
        {
            !isLoginLoading && 
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='email' name='email' onChange={handleChance}/>
                <input type="password" placeholder='password'  name='password' onChange={handleChance}/>
                <button>login</button>
            </form>
        }
        {
            hasLoginError && <strong>Credentials invalid</strong>
        }
        
    </div>
  )
}
