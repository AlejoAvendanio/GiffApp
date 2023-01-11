import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

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
        ?
        <button onClick={handleClick}>
            Logout
        </button>
        :<>
          <Link to="/login">
              Login
          </Link>
          <Link to="/register">
            Register
          </Link>
        </>
    }
    </header>
  )
}
