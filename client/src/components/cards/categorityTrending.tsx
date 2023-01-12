import { useNavigate } from 'react-router-dom'
type cate = {
  categority:string,
  ranking:string
}
export const CategorityTrending = ({ranking ,categority}:cate) => {
    const navegate = useNavigate()
    const handleClick = ()=>{
        navegate(`/search/${categority}/${ranking}`)
    }
  return (
    <div className='categority'>
        <span className='' onClick={()=>handleClick()}>{categority}</span>
    </div>
  )
}
