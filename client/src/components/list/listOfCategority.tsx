import { useEffect, useState } from 'react'
import { CategorityTrending } from '../cards/categorityTrending'
import { getTrendingTerms } from '../fetch/useFetch'

export default function TrendingSerches() {
    const [trends, setTrends] = useState([])
    
    useEffect(()=>{
        getTrendingTerms().then(res=>setTrends(res))
    })
  return (
    <div>
        <h3>Trending Giff</h3>
    <div className='divListCategority'>
    {
        trends?.map((e)=><CategorityTrending ranking={"g"} categority={e}/>)
    }
  </div>
  </div>
  )
}


