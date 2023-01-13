import React from 'react'
import { Header } from '../header'
import SearchBar from '../searchBar'
import emoji from "../img/emoju.png"
import { Link } from 'react-router-dom'
export const NavBar = ({setGifs,setLoading,initalInput ="", initialRating="g"}:any) => {
  return (
    <nav className='divHome' style={{display:"flex", justifyContent:"space-between" ,padding:"20px 40px"}}>
        <div>
          <Link style={{textDecoration:"none"}} to={"/"}><h1 className='h1' style={{ display:"flex"}}><img src={emoji} alt={"im"} width={50}/>Giffy clone</h1></Link>
        </div>
        <div  className='divHome' style={{display:"flex",alignItems:"center", justifyContent:"space-between"}}>
          <SearchBar 
          setGifs={setGifs} 
          setLoading={setLoading} 
          initalInput={initalInput} 
          initialRating={"g" || initialRating}/>
          <Header/>
        </div>
      </nav>
  )
}
