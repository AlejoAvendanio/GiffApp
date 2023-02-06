import axios from "axios";
import { Favorite } from "../hooks/useUser";


export const ENDPOINT = "https://giffapp-production.up.railway.app"



export default async function addFav (gif:Favorite,jwt:string){
  const token = jwt.slice(1,-1)  
    
    const config = {
      method: "POST",
      baseURL: `${ENDPOINT}/users/favorite`,
      headers:{token:token},
      data: {
        gif,
      },
    };
    return await axios(config)
      .then(res=>{
        const {data} = res
        return data
      })
      .catch((error)=>console.log(error))
}
