import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
export default function Card({src,alt, id }:any) {

  return (
          <div className='card'>
    <Link to={`/detail/${id}`}>
            <img src={src} alt={alt} />
        </Link>
          </div>
  )
}
