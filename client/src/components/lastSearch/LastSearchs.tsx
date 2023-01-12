
import ListGifs from '../list/listOfGifs'

export const LastSearchs = () => {
  // const {lastSearchName} = useContext(Context) as UserContexType
  let lastSearch:any= window.localStorage.getItem("lastsearch")
  lastSearch= JSON.parse(lastSearch)

  let lastSearchName:any= window.localStorage.getItem("lastSearchName")
  lastSearchName= JSON.stringify(lastSearchName).slice(1,-1)
  console.log(lastSearchName)
  return <div>
    <h3 className='h2'>Last Serch: {lastSearchName}</h3>
    <ListGifs gifs={lastSearch}/>
  </div>
}
