import React, { useEffect, useState,useContext } from 'react'
import Context from '../context/userContex'
import { getRandomGif } from '../fetch/useFetch'
import { UserContexType } from '../hooks/type'
import { Loading } from '../loading'



export default function Relevantes() {
    const {trends} = useContext(Context) as UserContexType
    const [panda , setPanda] = useState([])
    const [perritos , setPerritos] = useState([])
    const [gatitos , setGatitos] = useState([])
    useEffect(()=>{
        getRandomGif({keyword:trends[1]}).then(res=>setPanda(res))
        getRandomGif({keyword:trends[8]}).then(res=>setPerritos(res))
        getRandomGif({keyword:trends[3]}).then(res=>setGatitos(res))
    },[trends])
  return (
    <div>
        <h3 style={{color:"#fff"}}>Mas relevantes</h3>
            <h3 style={{color:"#fff"}}>{trends[1]}</h3>
        <div style={{display:"flex", justifyContent:"space-around"}}>
        
        
        {
            panda.length ? 
        panda.map((e:any)=>{
            return(
                    <img style={{width:"200px",height:"150px",}} key={e.id} src={e.url} alt={e.id}/>
            )})
        : <></>
        }
        </div>
        <h3 style={{color:"#fff"}}>{trends[8]}</h3>
        <div style={{display:"flex", justifyContent:"space-around"}}>
        {
            perritos.length ?
        perritos.map((e:any)=>{
            return(
                    <img style={{width:"200px",height:"150px"}}key={e.id} src={e.url} alt={e.id}/>
            )
        })
        
        : <></>
    }</div>
        <h3 style={{color:"#fff"}}>{trends[3]}</h3>
        <div style={{display:"flex", justifyContent:"space-around"}}>
        {
            gatitos.length ?
        gatitos.map((e:any)=>{
            return(
                    <img key={e.id} style={{width:"200px",height:"150px"}} src={e.url} alt={e.id}/>
            )
        })
        : <></>
        }</div>
    </div>
  )
}
