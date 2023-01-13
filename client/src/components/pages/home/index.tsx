
import { useEffect, useState } from 'react'
import UseFetch from '../../fetch/useFetch'
import ListGifs from '../../list/listOfGifs'
import LazyTrending from '../../loading/lazyTranding'
import Relevantes from '../../relevantes'
import {Helmet} from 'react-helmet'
import { Loading } from '../../loading'
import { LastSearchs } from '../../lastSearch/LastSearchs'
import "./style.css"
import { useUser } from '../../hooks/useUser'
import { Link } from 'react-router-dom'
import { NavBar } from '../../navBar'
import {UseRandom} from '../../fetch/random'


export const Home = () => {
  const [gifs, setGifs] = useState<Array<URL>>([])
  const [randoms, setRandom] = useState<string>("")

  // const {lastSearch} = useContext(Context) as UserContexType
  const [loading, setLoading] = useState<Boolean>(false)
  const title = gifs.length>0 ? "Home | GiffApp" : loading ? "" :"Cargando... | GiffApp"
  let lastSearch:any
  const {isLogged} = useUser()
  
  useEffect(()=>{
    try{
      UseRandom().then(res=>{
        setRandom(res)
      }) 
    }catch(e){
      console.log(e)
    }
  },[setRandom])
  useEffect(function(){
    setLoading(false)
    try{
      UseFetch({keyword:randoms }).then(gifs=>{
        setGifs(gifs)
        setLoading(true)
      })
    }catch(e){
      throw new Error()
    }
  },[randoms])


  lastSearch= window.localStorage.getItem("lastsearch")
  JSON.parse(lastSearch)

  const tittle:string = randoms.split(" ").slice(0,2).join(" ")
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Home GiffApp"></meta>
      </Helmet>

      <NavBar setGifs={setGifs} setLoading={setLoading} />

    <section className='section_fav'>
      {
        isLogged ?
          <Link to={"/favs"} className={"regis"}>
              Favs
          </Link>
        :
          <></>
      }
    </section>

      {
        lastSearch?.length ?
          <LastSearchs/>
          : <></>
      }
      {
        loading ?
          <div>
          <Relevantes/>
            <h2 className='h2'>The Best Trending:{tittle}</h2>
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
