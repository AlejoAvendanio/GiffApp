export type User = {
    id:string,
    name:string,
    token:string
}
export type UserContexType ={
    jwt: string,
    favs:[],
    setJWT: (value:string)=>void,
    setFav:(value:any)=>any
}