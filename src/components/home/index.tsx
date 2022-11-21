
import React, { useEffect, useState } from 'react'
import UseFetch from '../fetch/useFetch'
import TrendingSerches from '../list/listOfCategority'
import ListGifs from '../list/listOfGifs'
import LazyTrending from '../loading/lazyTranding'
import Relevantes from '../relevantes'
import SearchBar from '../pages/searchBar'
import {Helmet} from 'react-helmet'


export const Home = () => {
    const [gifs, setGifs] = useState<Array<URL>>([])
  const [loading, setLoading] = useState<Boolean>(false)
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
        <title>Home | GiffApp</title>
        <meta name="description" content="Home GiffApp"></meta>
      </Helmet>
      <SearchBar setGifs={setGifs} setLoading={setLoading}/>
      <Relevantes/>
        <div>{
        <ListGifs gifs={gifs}/>
        }</div>
        <div>
          <LazyTrending/>
        </div>
    </div>
  )
}
