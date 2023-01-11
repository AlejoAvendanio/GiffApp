import React, {useState ,useEffect} from 'react'
import { useNavigate } from 'react-router'
import { useUser } from '../hooks/useUser'
import "./style.css"

interface user {
    email:string,
    password:string
}

export const Login = () => {
    const navigate = useNavigate()
    const {hasLoginError,isLoginLoading,login} = useUser()
    const [log,setLog]= useState<boolean | void>(false)
    const [input, setInput] = useState<user>({
        email:"",
        password:""
    })

    useEffect(()=>{
        if(log){ 
                navigate("/")
                window.location.reload();
        }
    },[log,navigate])
    
    const handleChance = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInput({...input,
        [e.target.name] : e.target.value})
        }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        login(input).then((res)=>{
            setLog(res)
        })
        
    }
  return (
    <div className='init'>
        {
            isLoginLoading && <strong>Checking credentials...</strong>
        }
        {
            !isLoginLoading && 
            <form onSubmit={handleSubmit} className="form">
                <input className='int' type="text" placeholder='email' name='email' onChange={handleChance}/>
                <input className='int' type="password" placeholder='password'  name='password' onChange={handleChance}/>
                <button className='btnSubmit'>login</button>
            </form>
        }
        {
            hasLoginError && <strong>Credentials invalid</strong>
        }
        
    </div>
  )
}
