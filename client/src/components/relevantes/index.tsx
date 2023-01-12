import React, { useEffect, useState,useContext } from 'react'
import Context from '../context/userContex'
import { getRandomGif } from '../fetch/useFetch'
import { UserContexType } from '../hooks/type'
import "./style.css"



export default function Relevantes() {
    const {trends} = useContext(Context) as UserContexType
    const [panda , setPanda] = useState<string[]>([])
    const [perritos , setPerritos] = useState<string[]>([])
    const [gatitos , setGatitos] = useState<string[]>([])
    useEffect(()=>{
        if(!panda.length || !perritos.length|| !gatitos.length){
        getRandomGif({keyword:trends[0]}).then(res=>setPanda(res))
        getRandomGif({keyword:trends[8]}).then(res=>setPerritos(res))
        getRandomGif({keyword:trends[2]}).then(res=>setGatitos(res))
    }    
    },[getRandomGif,trends,panda,perritos,gatitos])
    // console.log(panda)
  return (
    <div >
        <h3 className='h2'>Mas relevantes</h3>
        <section style={{display:"flex", justifyContent:"space-around"}}>
            <article className='article'>
                <h3 className='h3'>{trends[1]}</h3>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                {
                    panda.length ? 
                        panda.map((e:any)=>{
                            return(
                                    <img key={e.id} src={e.url} alt={e.id}/>
                            )})
                        : <></>
                }
                </div>
            </article>
            <article className='article'>
                <h3 className='h3'>{trends[8]}</h3>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    {
                        perritos.length ?
                            perritos.map((e:any)=>{
                                return(
                                        <img key={e.id} src={e.url} alt={e.id}/>
                                )
                            })
                            : <></>
                    }
                </div>
            </article>
            <article className='article'>
                <h3 className='h3'>{trends[3]}</h3>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    {
                        gatitos.length ?
                            gatitos.map((e:any)=>{
                                return(
                                        <img key={e.id} src={e.url} alt={e.id}/>
                                )
                            })
                            : <></>
                    }
                </div>
            </article>
        </section>
    </div>
  )
}
