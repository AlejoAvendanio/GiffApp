
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UseFetch from '../../fetch/useFetch'
import ListGifs from '../../list/listOfGifs'
import { useSEO } from '../../hooks/useSEO'
import {Helmet} from 'react-helmet'
import { Loading } from '../../loading'
const INITIAL_STATE = 0
export default function SearchResults() {
    const { input } = useParams()
    const [gifs, setGifs] = useState()
    const [loading, setLoading] = useState(false)
    const nextpage = useRef(null)
    const [page,setPage] = useState(INITIAL_STATE)
    const title = gifs 
    ? `${gifs.length} resultados de ${input}` 
    : loading 
    ? ""
    : "Cargando..."
    useEffect(()=>{
        UseFetch({keyword:input}).then(res=>setGifs(res))
    },[input])
    useEffect(()=>{
      if(page===INITIAL_STATE)return
      UseFetch({ keyword:input, page}).then(res=>{
        setGifs(prevGifs=> prevGifs?.concat(res))
      })
    },[page,input])

    useSEO({title:title})

    useEffect(()=>{
      const handleNextPage = (entries)=>{
        console.log(entries)
        const el = entries[0]
        if(el.isIntersecting){
          setLoading(true)
          setTimeout(()=>{
            setPage((e)=>e+1)
            setLoading(false)
          },1500)
          observer.disconnect()
          console.log(page)
        }
      }
      // const debounceHandleNextPage = ()=>debounce(handleNextPage)
      const observer = new IntersectionObserver(handleNextPage,{
        rootMargin:"20px"
      })
      observer.observe(nextpage.current)
      return ()=> observer && observer.disconnect()
    },[page])


  return (
    <div>
      <Helmet>
        <title>{title} | GiffApp</title>
        <meta name="description" content={title}></meta>
      </Helmet>
        <Link to={"/"}><button>home</button></Link>
        <ListGifs gifs={gifs}/>
        {loading ? "":<Loading/>}
        <div ref={nextpage}>
        </div>
    </div>
  )
}
