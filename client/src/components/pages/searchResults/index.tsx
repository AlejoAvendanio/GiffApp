
import { useEffect, useRef, useState,useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import UseFetch from '../../fetch/useFetch'
import ListGifs from '../../list/listOfGifs'
import {Helmet} from 'react-helmet'
import { Loading } from '../../loading'
import SearchBar from '../../searchBar'
import "./style.css"
import Context from '../../context/userContex'
import { UserContexType } from '../../hooks/type'


const INITIAL_STATE = 0

export default function SearchResults() {
  
    const { input,rating} = useParams()

    const [gifs, setGifs] = useState<string[]>([])

    const [loading, setLoading] = useState<boolean>(false)

    const nextpage = useRef(null)

    const [page,setPage] = useState<number>(INITIAL_STATE)

    const {setLastSearch} = useContext(Context) as UserContexType
    
    const title = gifs 
    ? `${gifs.length} resultados de ${input}` 
    : loading 
    ? ""
    : "Cargando..."

    useEffect(()=>{
        UseFetch({keyword:input,rating:rating}).then(res=>setGifs(res))
        window.localStorage.setItem("lastSearchName",input || "")
    },[input, rating])

    useEffect(()=>{
      if(page===INITIAL_STATE)return
      UseFetch({ keyword:input, page, rating:rating}).then(res=>{
        setGifs((prevGifs:any)=> prevGifs?.concat(res))
        setLastSearch(gifs)
      })
    },[page,input,rating])

    // useSEO({title:title})
    let titlePage = input?.toUpperCase()
    useEffect(()=>{
      const handleNextPage = (entries:any)=>{
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
      observer.observe(nextpage.current!)
      return ()=> observer && observer.disconnect()
    },[page])
    window.localStorage.setItem("lastsearch",JSON.stringify(gifs.slice(0,15)))

  return (
    <div>
      <Helmet>
        <title >{title} | GiffApp</title>
        <meta name="description" content={title}></meta>
      </Helmet>
        <Link to={"/"}><button>home</button></Link>
        <SearchBar setGifs={setGifs} setLoading={setLoading} initalInput={input} initialRating={rating}/>
        <h3 className='titleSearch'>{titlePage}</h3>
        <ListGifs gifs={gifs}/>
        {loading ? "":<Loading/>}
        <div ref={nextpage}>
        </div>
    </div>
  )
}
