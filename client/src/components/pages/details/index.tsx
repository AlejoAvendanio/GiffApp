import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getInfoById } from '../../fetch/useFetch'
import {GIF} from "../../fetch/useFetch"
// import { useSEO} from '../hooks/useSEO'
import {Helmet} from 'react-helmet'
export const Details = () => {
  const id = useParams()
  const [gifId, setGifId] = useState<GIF>()
  const title = gifId ? gifId.title : "Cargando..."
  // useSEO({desciption:`Detail of ${title}`,title:title})
    useEffect(()=>{
      getInfoById(id).then(gif=>setGifId(gif))
    },[id])
    console.log(id)
  return (
    <div>
      <Helmet>
        <title>{title} || GiffApp</title>
        <meta name="description" content={title}></meta>
      </Helmet>
      <Link to={"/"}><button>home</button></Link>
      <h1>{gifId?.title}</h1>
      <img src={gifId?.url} alt={gifId?.title}/>
      <p>{gifId?.shared}</p>
    </div>
  )
}
