
import axios from "axios";

const ENDPOINT = "http://localhost:3002/users"

export default async function getFavs (jwt:string){  
  const token = jwt.slice(1,-1)  
  console.log(token)
    const config = {
            method: "get",
      baseURL: `${ENDPOINT}/favorite`,
      headers:{token:token},
    };
    return await axios(config)
      .then(res=>{
        const {data} = res
        return data
      })
      .catch((error)=>console.log(error))
}