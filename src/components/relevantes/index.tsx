import React, { useEffect, useState } from 'react'
import { getRandomGif } from '../fetch/useFetch'

export default function Relevantes() {
    const [panda , setPanda] = useState([])
    const [perritos , setPerritos] = useState([])
    const [gatitos , setGatitos] = useState([])
    useEffect(()=>{
        getRandomGif({keyword:"panda"}).then(res=>setPanda(res))
        getRandomGif({keyword:"perritos"}).then(res=>setPerritos(res))
        getRandomGif({keyword:"gatitos"}).then(res=>setGatitos(res))
    },[])
  return (
    <div>
        <h3>Mas relevantes</h3>
            <h3>pandas</h3>
        <div style={{display:"flex", justifyContent:"space-around"}}>
        {
        panda?.map((e:any)=>{
            return(
                    <img style={{width:"200px",height:"150px",}} src={e.url} alt={e.id}/>
            )})
        }</div>
        <h3>perritos</h3>
        <div style={{display:"flex", justifyContent:"space-around"}}>
        {
        perritos?.map((e:any)=>{
            return(
                    <img style={{width:"200px",height:"150px"}} src={e.url} alt={e.id}/>
            )
        })
        }</div>
        <h3>gatitos</h3>
        <div style={{display:"flex", justifyContent:"space-around"}}>
        {
        gatitos?.map((e:any)=>{
            return(
                    <img style={{width:"200px",height:"150px"}} src={e.url} alt={e.id}/>
            )
        })
        }</div>
    </div>
  )
}
