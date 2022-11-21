import React from 'react'
import "./style.css"
export const Loading = () => {
  return (
    <div className='center' style={{color:'#fff'}}>
        <div className="ring">
        </div>
        <span className='spanLoader'>loading...</span>
    </div>
  )
}
