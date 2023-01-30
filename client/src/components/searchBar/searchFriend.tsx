import {useState} from 'react'
import "./style.css"
import { useChat } from '../hooks/useChat'

const name = window.localStorage.getItem("name")

export interface Friend {
    name:string,
    id:string
}
export const SearchFriend = () => {
    const {fetchFriendChat, friend, createChat,chats,setChatSelected,currentChat,setChatInfo,allChats} = useChat()
    const [input, setInput] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        setInput(e.target.value)
        fetchFriendChat(input)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        allChats()
    }
    const handleSelectChat = (e:any)=>{
        setChatSelected(e)
        //info del chat
        currentChat(e)
    }
    const createChats = (e: any):any=>{
    createChat(e).then(res=>setChatInfo(res))
    allChats()
    }
    return (
    <div style={{display:'flex', alignItems:'center',position:"relative",flexDirection:"column"}}>
        <form onSubmit={handleSubmit} style={{display:'flex', alignItems:'center',position:"relative"}}>
            <input style={{    height: 28,fontSize: 14}} onChange={(e)=>handleChange(e)} />
            <button className='searchButton'>Search</button>
            </form>
            <div style={{display:'flex',flexDirection:"column", background:"#fff", width:176,textAlign:'center',color:"#000",position:"absolute",top:35,left:30}}>
                {
                input ?
                friend && friend?.length ? 
                    friend.map((e:Friend)=>{
                    return<span 
                        className='span_chat' 
                        onClick={()=>{
                            createChats(e.id)
                            }} 
                        key={e.id}
                        >
                        {e.name}
                        </span>})
                    :<p>sin resultados</p>
                : <></>
            }</div>
            <div className="mi-scroll chats">
            {
                chats?.length ? 
                chats.map((e:any)=>{
                return <span
                    className='span_name' 
                    onClick={()=>{handleSelectChat(e._id)}}
                    key={e._id}
                >
                    {
                    e.friend1 !== name ?
                    <p style={{margin:0}}>{e.friend1}</p>
                    :
                    <p style={{margin:0}}>{e.friend2}</p>
                    }
                </span>})
                : <></>
            }
            </div>
        
    </div>
  )
}
