import React from 'react'
import { useNavigate } from 'react-router-dom'
export const CategorityTrending = ({categority}:any) => {
    const navegate = useNavigate()
    const handleClick = ()=>{
        navegate(`/search/${categority}`)
    }
  return (
    <div className='categority'>
        <span onClick={handleClick}>{categority}</span>
    </div>
  )
}
