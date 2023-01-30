import axios from "axios"

export const postMessages = async(jwt:string,id:string,info:any)=>{
    const token = jwt.slice(1,-1)  
    const config = {
        method: "post",
        baseURL: `http://localhost:3002/messages`,
        headers:{token:token},
        data:{id,content:info}
    }
    const {data} = await axios(config)
    return data
}

export const allMessages = async (jwt:string,chatID:string)=>{
    const token = jwt.slice(1,-1)  
    console.log(chatID)
    const config = {
        method: "post",
        baseURL: `http://localhost:3002/messages/allMessages`,
        headers:{token:token},
        data:{chatID}
    }
    const {data} = await axios(config)
    return data
}