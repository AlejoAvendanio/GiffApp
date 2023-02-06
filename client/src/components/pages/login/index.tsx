import React from 'react'
import { Link } from 'react-router-dom'
import { Login } from '../../login'
import "./style.css"
import emoji from "../../img/emoju.png"
export const LoginPage = () => {
  return <div className='login_register'>
    <div>
      <Link style={{textDecoration:"none"}} to={"/"}>
        <h1 className='h1' style={{ display:"flex"}}>
          <img src={emoji} alt={"im"} width={50}/>
          Giphy clone
        </h1>
      </Link>
    </div>
    <div className='divContent'>
      <h2 className='h1 motion'>Login</h2>
      <Login/> 
    </div> 
  </div>
}
