import React, { useState } from 'react'
import UseFetch from '../../fetch/useFetch'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({setGifs,setLoading}:any) {
    const [ input , setInput] = useState("rick")
  const navegate = useNavigate()

    const handleChance = (e:React.ChangeEvent<HTMLInputElement>)=>{
      setInput(e.target.value)
    }
    const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      setLoading(false)
      setGifs("")
      navegate(`/search/${input}`)
    }
  return (
    <div className='search'>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input type="text" onChange={(e)=>handleChance(e)} name={input}/>
          <button>search</button>
        </form>
      </div>
  )
}
