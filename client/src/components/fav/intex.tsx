import React from 'react'
import { useNavigate } from 'react-router'
import { useUser } from '../hooks/useUser'

export default function Fav ({id}:any) {
  const {isLogged,fav} = useUser()
  const navigate = useNavigate()
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
    if(!isLogged) return navigate("/login")
    fav(id)
  }
  return (
    <button onClick={handleClick}>
      <span aria-label='Fav Gif' role="img">❤</span>
    </button>
  )
}
