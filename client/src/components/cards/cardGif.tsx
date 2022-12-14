import React from 'react'
import { Link } from 'react-router-dom'
import Fav from '../fav/intex'

import "./style.css"
export interface GIF{
  src:string,
  alt:string,
  id:string,
  url?:string,
  title?:string
}
export default function Card({src,alt, id }:GIF) {

  return (
    <div className='card'>
      <Fav id={id}/>
      <Link to={`/detail/${id}`}>
        <img src={src} alt={alt} />
      </Link>
    </div>
  )
}
