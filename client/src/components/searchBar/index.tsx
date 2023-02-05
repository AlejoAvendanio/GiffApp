import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Gifs } from '../list/listOfGifs'




import useForm from './hook'
import "./style.css"

const RATINGS = ["g", "pg", "pg-13", "r"]


export interface info {
  setGifs:(value:Gifs[])=>void,
  setLoading: (value:boolean)=>void,
  initalInput?:string,
  initialRating?:string,
}

export default function SearchBar({setGifs,setLoading,initalInput ="", initialRating="g"}:info) {
  
  const {input, rating, updateInput, updateRating} = useForm({initalInput, initialRating})
  
  const navegate = useNavigate()
  // const {set} = useUser()
  

  const handleChance = (e:React.ChangeEvent<HTMLInputElement>)=>{
    updateInput(e.target.value)
  }
  const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setLoading(false)
    setGifs([])
    navegate(`/search/${input}/${rating}`)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    updateRating(e.target.value )
  }

  return (
    <div className='search'>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input type="text" onChange={(e)=>handleChance(e)} name={input} value={input}/>
          {
          input ?
          <button className='searchButton' style={{height:34, border:"none",marginLeft:3,width:61}}>Search</button>
          : <button className='searchButton' style={{height:34, border:"none",marginLeft:3,width:61, cursor:"not-allowed"}} disabled>Search</button>  
        }
        </form>
        <select value={rating} onChange={handleSelect}>
          
            <option disabled>Rating</option>
          {  
            RATINGS.map((e:string) =><option key={e}>{e}</option>)
          }
        </select>
      </div>
  )
}
