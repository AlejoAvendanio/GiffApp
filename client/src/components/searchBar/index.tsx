import React,{useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/userContex'
import { UserContexType } from '../hooks/type'



import useForm from './hook'
import "./style.css"

const RATINGS = ["g", "pg", "pg-13", "r"]


export interface info {
  setGifs:any,
  setLoading: any,
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
    setGifs("")
    navegate(`/search/${input}/${rating}`)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    updateRating(e.target.value)
  }

  return (
    <div className='search'>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input type="text" onChange={(e)=>handleChance(e)} name={input} value={input}/>
          <button>search</button>
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
