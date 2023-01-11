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
    setLastSearchName:(value:string)=>void,
    setTrends:(value:string[])=>void,
    setJWT: (value:string)=>void,
    setFav:(value:string[])=>void,
    setLastSearch:(value:string[])=>void
}