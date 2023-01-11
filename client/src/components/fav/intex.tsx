import React, { useState } from 'react'
// import { useNavigate } from 'react-router'
import { useUser } from '../hooks/useUser'
import  ModalPortal  from '../modal'
import { LoginPage } from '../pages/login'
import { RegisterPage } from '../pages/register/inex'
import "./style.css"
interface FAVS {
  id:string
}

export default function Fav ({id}:any) {
  const {isLogged,fav, favs} = useUser()
  // const navigate = useNavigate()
  const [showModal,setShowModal] = useState(false) 
  const [type,setType] = useState("login")
  const handleSetTypeRegister = ()=>{
    setType("register")
  }
  const handleSetTypeLogin = ()=>{
    setType("login")
  }
  const handleClick = ()=>{
    if(!isLogged) return setShowModal(true)
    fav(id)
  }
  const handleClose = ()=>{
    setShowModal(false)
  }
  const isFaved = favs?.some((favId:FAVS)=>favId.id===id)
  const [
    label,
    emaji
  ] = isFaved
  ? [
    "Remove",
    "❌"
  ]
  : [
    "Add Favorite",
    "❤"
  ]
  return (
    <>
      <button onClick={()=>handleClick()} className="fav_button">
        <span aria-label={label} role="img">{emaji}</span>
      </button>
      {showModal && <ModalPortal onClose={handleClose}>{
        <div>
          <span className='span-type' style={{padding:"5px", cursor:"pointer"}} onClick={()=>handleSetTypeRegister()}>Register</span>
          <span className='span-type' style={{padding:"5px", cursor:"pointer"}} onClick={()=>handleSetTypeLogin()}>Login</span>
            {type==="register" ? <RegisterPage/> : <LoginPage/> }
        </div> }</ModalPortal>}
    </>
  )
}