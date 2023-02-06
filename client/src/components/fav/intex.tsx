import React, { useState } from 'react'
// import { useNavigate } from 'react-router'
import { useUser } from '../hooks/useUser'
import { LoginModal } from '../login/loginModal'
import  ModalPortal  from '../modal'
import { LoginPage } from '../pages/login'
import { RegisterPage } from '../pages/register/inex'
import { RegisterModal } from '../register/RegisterModal'
import "./style.css"
type FAVS =  {
    id:string,
    url:string,
    title:string,
    shared:string
}

const Fav:React.FC<FAVS> = ({id,url,shared,title})=> {
  const {isLogged,fav, favs} = useUser()
  // const navigate = useNavigate()
  const gif = {
    id,
    url,
    shared,
    title
  }
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
    fav(gif)
  }
  const handleClose = ()=>{
    setShowModal(false)
  }
  const isFaved = favs?.some((favId:FAVS)=>{
    return favId?.id===gif?.id
  })
  const [
    label,
    emaji
  ] = isFaved
  ? [
    "Remove",
    "☆"
  ]
  : [
    "Add Favorite",
    "★"
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
            {type==="register" ? <RegisterModal/> : <LoginModal/> }
        </div> }</ModalPortal>}
    </>
  )
}

export default Fav