import { Gifs } from "../list/listOfGifs"
import { Favorite } from "./useUser"

export type User = {
    id:string,
    name:string,
    token:string
}
type chatSelectInfo = {
    createdAt:string,
    friend1:string,
    friend2:string,
    isGrouoChat:boolean,
    latesMessages:any,
    updateAt:string,
    users:string[],
    _id:string
}
export type UserContexType ={
    jwt: string,
    favs:[],
    lastSearch:string[],
    trends:string[],
    lastSearchName:string,
    chats:[],
    chatSelected:string,
    chatInfo:chatSelectInfo
    setChatInfo:(value:object)=>void
    setChatSelected:(value:string | null)=>void
    setChats:(value:string[])=>void,
    setLastSearchName:(value:string)=>void,
    setTrends:(value:string[])=>void,
    setJWT: (value:string)=>void,
    setFav:(value:Favorite[])=>void,
    setLastSearch:(value:Gifs[])=>void
}