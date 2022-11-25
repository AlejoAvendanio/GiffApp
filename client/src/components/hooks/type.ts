export type User = {
    id:string,
    name:string,
    token:string
}
export type UserContexType ={
    jwt: boolean,
    setJWT: (value:boolean)=>void,
    setFav:(value:any)=>any
}