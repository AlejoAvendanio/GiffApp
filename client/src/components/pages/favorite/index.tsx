import { Link } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import ListGifs from '../../list/listOfGifs'



export const FavoritePage = () => {
    const {favs} = useUser()
    console.log(favs)
  return (
    <div>
      <nav>
        <Link to={"/"} className={"regis"}>
          home
        </Link>
      </nav>
        {
          <ListGifs gifs={favs}/>
        }
    </div>
  )
}
