import { Gifs } from "../list/listOfGifs"

export type User = {
    id:string,
    name:string,
    token:string
}
export type UserContexType ={
    jwt: string,
    favs:[],
    lastSearch:string[],
    trends:string[],
    lastSearchName:string,
    chats:[],
    chatSelected:string,
    chatInfo:any
    setChatInfo:(value:any)=>void
    setChatSelected:(value:string | null)=>void
    setChats:(value:string[])=>void,
    setLastSearchName:(value:string)=>void,
    setTrends:(value:string[])=>void,
    setJWT: (value:string)=>void,
    setFav:(value:string[])=>void,
    setLastSearch:(value:Gifs[])=>void
}