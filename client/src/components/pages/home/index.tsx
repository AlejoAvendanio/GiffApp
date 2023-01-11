
import { useEffect, useState,useContext } from 'react'
import UseFetch from '../../fetch/useFetch'
import ListGifs from '../../list/listOfGifs'
import LazyTrending from '../../loading/lazyTranding'
import Relevantes from '../../relevantes'
import SearchBar from '../../searchBar'
import {Helmet} from 'react-helmet'
import { Loading } from '../../loading'
import { LastSearchs } from '../../lastSearch/LastSearchs'
import { UserContexType } from '../../hooks/type'
import Context from '../../context/userContex'
import { getTrendingTerms } from '../../fetch/useFetch'
import { Header } from '../../header/index';

// console.log(process.on)


export const Home = () => {
  const [gifs, setGifs] = useState<Array<URL>>([])
  // const {lastSearch} = useContext(Context) as UserContexType
  const [loading, setLoading] = useState<Boolean>(false)
  const title = gifs.length>0 ? "Home | GiffApp" : loading ? "" :"Cargando... | GiffApp"
  let lastSearch:any

  useEffect(function(){
    setLoading(false)
    try{
      UseFetch({keyword:"luffy" }).then(gifs=>{
        setGifs(gifs)
        setLoading(true)
      })
    }catch(e){
      throw new Error()
    }
  },[])
  lastSearch= window.localStorage.getItem("lastsearch")
  JSON.parse(lastSearch)
  
  return (
    <div>
      <nav style={{display:"flex", justifyContent:"space-between" ,padding:"20px 40px"}}>
        <div>
          <h1 style={{color:"#FFF"}}>Giffy clone</h1>
        </div>
        <div style={{display:"flex",alignItems:"center",width:400, justifyContent:"space-between"}}>
          <SearchBar 
          setGifs={setGifs} 
          setLoading={setLoading} 
          initalInput={""} 
          initialRating={"g"}/>
          <Header/>
        </div>
      </nav>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Home GiffApp"></meta>
      </Helmet>
      {
        lastSearch.length ?
        <LastSearchs/>
        : <></>
        }
      {
        loading ?
      <div>
      <Relevantes/>
        <h2 style={{color:"#fff"}}>Mas Relevante del dia</h2>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          {
            gifs.length ?
        <ListGifs gifs={gifs}/>
        : <Loading></Loading>
        }</div>
        <div>
          <LazyTrending/>
        </div>
        </div>
      : <Loading/>  
      }
    </div>
  )
}
