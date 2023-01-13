import React, { useEffect, useState,useContext } from 'react'
import Context from '../context/userContex'
import { getRandomGif } from '../fetch/useFetch'
import { UserContexType } from '../hooks/type'
import { Loading } from '../loading'
import "./style.css"

type relevant = {
    id:string,
    url:string
}

export default function Relevantes() {
    const {trends} = useContext(Context) as UserContexType
    const [panda , setPanda] = useState<relevant[]>([])
    const [perritos , setPerritos] = useState<relevant[]>([])
    const [gatitos , setGatitos] = useState<relevant[]>([])
    let tren = trends ? trends : ""
    
    useEffect(()=>{
        try{
            getRandomGif({keyword:tren[0]}).then(res=>{
                return setPanda(res)})
            getRandomGif({keyword:tren[8]}).then(res=>setPerritos(res))
            getRandomGif({keyword:tren[2]}).then(res=>setGatitos(res))
        }catch(e){
            console.log(e)
        }
    },[tren.length ? "":tren])
  return (
    <div >{
        panda.length ? <div>
        <h3 className='h2'>Top Trending</h3>
        <section style={{display:"flex",flexWrap:"wrap", justifyContent:"space-around"}}>
            <article className='article'>
                <h3 className='h3'>{trends[1]}</h3>
                <div>
                {
                    panda.length ? 
                        <img key={panda[0].id} src={panda[0].url} alt={panda[0].id}/>
                        : <></>
                }
                </div>
            </article>
            <article className='article'>
                <h3 className='h3'>{trends[8]}</h3>
                <div >
                    {
                        perritos.length ?
                        <img key={perritos[0].id} src={perritos[0].url} alt={perritos[0].id}/>
                            : <></>
                    }
                </div>
            </article>
            <article className='article'>
                <h3 className='h3'>{trends[3]}</h3>
                <div>
                    
                    {
                        gatitos.length ?
                            <img key={gatitos[0].id} src={gatitos[0].url} alt={gatitos[0].id}/>
                            : <></>
                    }
                </div>
            </article>
        </section>
    </div>
    : <Loading/>
    }</div>
  )
}
