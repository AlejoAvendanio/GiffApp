import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import UseFetch, { getInfoById } from '../../fetch/useFetch'
import {GIF} from "../../fetch/useFetch"
import "./style.css"
import copy from "../../img/copiar.png"
import {Helmet} from 'react-helmet'
import ListGifs, { Gifs } from '../../list/listOfGifs'
import { Loading } from '../../loading'
import { NavBar } from '../../navBar'
import { searchId } from '../../fetch/useFetch'
export const Details = () => {
  const id:any = useParams()
  const [gifId, setGifId] = useState<GIF>()
  const [list, setList] = useState<Gifs[]>([])
  const [pages,setPages] = useState<number>(1)
  const title = gifId ? gifId.title : "Cargando..."
  // useSEO({desciption:`Detail of ${title}`,title:title})
  const [loading, setLoading] = useState<Boolean>(false)
  useEffect(()=>{
    setLoading(false)
      getInfoById(id).then(gif=>{
        setLoading(true)
        setGifId(gif)
      })
      UseFetch({keyword:gifId?.title,limit:23}).then((res)=>setList(res))
    },[id,list.length? "": list])
    console.log(list)
    console.log(gifId)
    const value = gifId?.shared

const moreGfs =()=>{
  UseFetch({keyword:gifId?.title,page:pages}).then((res)=>{
    setPages(prev=>prev+1)
    return setList(list.concat(res))
  })
}
  return (
    <div>
      <Helmet>
        <title>{title} || GiffApp</title>
        <meta name="description" content={title}></meta>
      </Helmet>
      {/* <Link to={"/"} className="regis">home</Link> */}
      <span id='idInitDetails' style={{margin:0}}></span>
      <NavBar setGifs ={setList} setLoading= {setLoading} />
      <section className='sectionRelevant' >
        <div className='divrev'>
          <img className='card' src={gifId?.url} alt={gifId?.title}/>
          <img src={copy} alt={copy} onClick={() => {
            navigator.clipboard.writeText(value ||"")
            alert("copy")}}
            className="img" ></img>
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
      <button onClick={()=>moreGfs()} className="btn">more gifs</button>
      <button onClick={()=>window.location.href='#idInitDetails'} className="btn">init</button>
    </div>
  )
}
