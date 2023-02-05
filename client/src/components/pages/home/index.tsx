import { useEffect, useState } from 'react'
import UseFetch from '../../fetch/useFetch'
import ListGifs, { Gifs } from '../../list/listOfGifs'
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
import { Chat } from '../chat'
import { SearchFriend }  from '../../searchBar/searchFriend'
import { useChat } from '../../hooks/useChat'
import { useMessages } from '../../hooks/useMessages'

const name = window.localStorage.getItem("name")

export const Home = () => {
  const [gifs, setGifs] = useState<Array<Gifs>>([])
  const [randoms, setRandom] = useState<string>("")
  const [openChat, setOpenChat] = useState<boolean>(false)
  const [openChat2, setOpenChat2] = useState<boolean>(false)
  const {getAllMessages}= useMessages()
  const {currentChat, chatInfo,allChats,chatSelected,setChatSelected,setChatInfo} = useChat()
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
  },[])

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
  },[randoms,setRandom])

  const handleChat = ()=>{
    setOpenChat(!openChat)
    allChats()
  }
  const handleChat2 = ()=>{
    setOpenChat2(!openChat2)
    //buscar info del chat 
    getAllMessages(chatSelected)
    currentChat(chatSelected).then(res=>setChatInfo(res))
  }
  lastSearch = window.localStorage.getItem("lastsearch")
  JSON.parse(lastSearch)
  const tittle:string = randoms.split(" ").slice(0,2).join(" ")
  return (
    <div style={{position:"relative"}}>
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
      
      {
      isLogged ? openChat ?
      <div  style={{flexDirection:"column",color:"white",height:"80%",background:"black", display:'flex',width:300, right:0, position:"fixed", zIndex:100,bottom:0}}>
        <header style={{height:60,fontSize:14, width:"100%",display:"flex",flexDirection:"column"}} onClick={handleChat}>
          <p className='h1' style={{fontSize:16,fontWeight:500,margin:"6px 0 0 10px"}}>Chatea con tus amigos y comparte gifs</p>
        </header>
          <div>
            <SearchFriend/>
          </div>

      </div>
      :<div onClick={handleChat} style={{height:40,background:"black", display:'flex',width:300, right:0, position:"fixed", zIndex:100,bottom:0}}>
        <p className='h1' style={{fontSize:16,fontWeight:500,margin:"6px 0 0 10px"}}>Chatea con tus amigos y comparte gifs</p>
      </div>
    :<></>  
    }
        {
          chatSelected ? openChat2 ?
      <div  style={{flexDirection:"column",color:"black",height:350,background:"#202c33", display:'flex',width:300, right:310, position:"fixed", zIndex:100,bottom:0}}>
          <Chat handleChat2={handleChat2} />
        </div>
        :<div onClick={handleChat2} style={{color:"aliceblue",height:40,background:"#202c33", display:'flex',width:300, right:310, position:"fixed", zIndex:100,bottom:0}}>
          <p style={{position:"absolute",top:-10,width:60}}>{
                chatInfo.friend1 !== name ?
                <p style={{margin:"0 0 0 10px"}}>{chatInfo.friend1}</p>
                :
                <p style={{margin:"0 0 0 10px"}}>{chatInfo.friend2}</p>
                }</p>
        <span onClick={()=>setChatSelected(null)} style={{top:4,position:"absolute",right:0,fontSize:20,fontWeight:600,color:"#ff6961",width:40}}>X </span>
        </div>
        :<></>
      }
        
    </div>
  )
}
