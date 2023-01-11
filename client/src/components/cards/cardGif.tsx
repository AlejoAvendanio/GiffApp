import React from 'react'
import { Link } from 'react-router-dom'
import Fav from '../fav/intex'

import "./style.css"
export interface GIF{
  src:string,
  alt:string,
  id:string,
  title?:string,
  url?:string,
}
export default function Card({src,alt, id }: GIF) {

  return (
    <div className='card'>
      <Fav id={id} />
      <Link className='a' to={`/detail/${id}`}>
        <img className='img' src={src} alt={alt} ></img>
      </Link>
    </div>
  )
}
