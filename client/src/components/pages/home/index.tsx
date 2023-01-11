
import { useEffect, useState } from 'react'
import UseFetch from '../../fetch/useFetch'
import ListGifs from '../../list/listOfGifs'
import LazyTrending from '../../loading/lazyTranding'
import Relevantes from '../../relevantes'
import SearchBar from '../../searchBar'
import {Helmet} from 'react-helmet'
import { Loading } from '../../loading'


// console.log(process.on)


export const Home = () => {
    const [gifs, setGifs] = useState<Array<URL>>([])
  const [loading, setLoading] = useState<Boolean>(false)
  const title = gifs.length>0 ? "Home | GiffApp" : loading ? "" :"Cargando... | GiffApp"
  useEffect(function(){
    setLoading(false)
    UseFetch({keyword:"morty"}).then(gifs=>{
      setGifs(gifs)
      setLoading(true)
    })
  },[])

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Home GiffApp"></meta>
      </Helmet>
      <SearchBar setGifs={setGifs} setLoading={setLoading} initalInput={""} initialRating={"g"}/>
      {
        loading ?
      <div>
      <Relevantes/>
        <div>{
        <ListGifs gifs={gifs}/>
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
