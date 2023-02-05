
import axios from "axios";
import { ENDPOINT } from "./addFavorite";



export default async function getFavs (jwt:string){  
  const token = jwt.slice(1,-1)  
  console.log(token)
    const config = {
            method: "get",
      baseURL: `${ENDPOINT}/users/favorite`,
      headers:{token:token},
    };
    return await axios(config)
      .then(res=>{
        const {data} = res
        return data
      })
      .catch((error)=>console.log(error))
}