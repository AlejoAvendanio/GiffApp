import axios from "axios"
import { ENDPOINT } from "./addFavorite";

export const postMessages = async(jwt:string,id:string,info:string)=>{
    const token = jwt.slice(1,-1)  
    const config = {
        method: "post",
        baseURL: `${ENDPOINT}/messages`,
        headers:{token:token},
        data:{id,content:info}
    }
    const {data} = await axios(config)
    return data
}

export const allMessages = async (jwt:string,chatID:string)=>{
    const token = jwt.slice(1,-1)  
    const config = {
        method: "post",
        baseURL: `${ENDPOINT}/messages/allMessages`,
        headers:{token:token},
        data:{chatID}
    }
    const {data} = await axios(config)
    return data
}