import axios from "axios"

import { ENDPOINT } from "./addFavorite";

export const searchFriendsChat = async (name:string,jwt:string)=>{
    const token = jwt.slice(1,-1)  
    const config = {
        method: "POST",
        baseURL: `${ENDPOINT}/users`,
        headers:{token:token},
        data:{
            name,
        }
};
    const friends = await axios(config)
    return friends.data
}


export const createChatFetch = async (id:string,jwt:string)=>{
    console.log(id)
    const token = jwt.slice(1,-1)  
    const config = {
        method: "POST",
        baseURL: `${ENDPOINT}/chat`,
        headers:{token:token},
        data:{
            id,
        }
};
    const chats = await axios(config)
    console.log(chats.data)
    return chats.data
}


export const getChatsUser = async (jwt:string)=>{
    const token = jwt.slice(1,-1)  
    const config = {
        method: "get",
        baseURL: `${ENDPOINT}/chat`,
        headers:{token:token}
    }
    const {data} = await axios(config)
    return data
}

export const getChatById = async(jwt:string,id:string)=>{
    const token = jwt.slice(1,-1)  
    const config = {
        method: "post",
        baseURL: `${ENDPOINT}/chat/chatById`,
        headers:{token:token},
        data:{id}
    }
    const {data} = await axios(config)
    return data
}