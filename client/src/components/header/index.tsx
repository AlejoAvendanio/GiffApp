import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import "./style.css"
export const Header = () => {
    const {isLogged, logout} = useUser()
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      e.preventDefault()
      logout()
    }
  return (
    <header>
    {
        isLogged
        ?<>
          <button className='regis' onClick={handleClick}>
              Logout
          </button>
        </>
        :<>
          <Link to="/login" className='regis'>
              Login
          </Link>
          <Link to="/register" className='regis'>
            Register
          </Link>
        </>
    }
    </header>
  )
}
