import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import UseFetch, { getInfoById } from '../../fetch/useFetch'
import {GIF} from "../../fetch/useFetch"
import "./style.css"
import copy from "../../img/copiar.png"
import {Helmet} from 'react-helmet'
import ListGifs from '../../list/listOfGifs'
import { Loading } from '../../loading'
export const Details = () => {
  const id = useParams()
  const [gifId, setGifId] = useState<GIF>()
  const [list, setList] = useState<string[]>([])
  const title = gifId ? gifId.title : "Cargando..."
  // useSEO({desciption:`Detail of ${title}`,title:title})
    useEffect(()=>{
      getInfoById(id).then(gif=>setGifId(gif))
      UseFetch({keyword:gifId?.title}).then((res)=>setList(res))
    },[id,list.length? "": list])
    console.log(list)
    console.log(gifId)
    const value= gifId?.shared
  return (
    <div>
      <Helmet>
        <title>{title} || GiffApp</title>
        <meta name="description" content={title}></meta>
      </Helmet>
      <Link to={"/"} className="regis">home</Link>
      <section className='sectionRelevant'>
        <div className='divrev'>
          <img className='card' src={gifId?.url} alt={gifId?.title}/>
          <img src={copy} alt={copy} onClick={() => {navigator.clipboard.writeText(value ||"")}} className="img" ></img>
        </div>
        <div >
          <h1 className='h1 detail_title'>{gifId?.title}</h1>
        </div>
      </section>
      
      {
        list.length ?
        <ListGifs gifs={list} />
        : <Loading/>
      }
    </div>
  )
}
