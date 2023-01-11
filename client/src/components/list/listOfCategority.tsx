import { useEffect,useContext } from 'react'
import { CategorityTrending } from '../cards/categorityTrending'
import Context from '../context/userContex'
import { getTrendingTerms } from '../fetch/useFetch'
import { UserContexType } from '../hooks/type'

export default function TrendingSerches() {
  const {trends,setTrends} = useContext(Context) as UserContexType
    
    useEffect(()=>{
        getTrendingTerms().then(res=>setTrends(res))
    })
  return (
    <div>
        <h3 className='h3'>Trending Giff</h3>
    <div className='divListCategority'>
    {
        trends?.map((e:any)=><CategorityTrending ranking={"g"} categority={e}/>)
    }
  </div>
  </div>
  )
}


