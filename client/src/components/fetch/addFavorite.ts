import axios from "axios";

const ENDPOINT = "http://localhost:3002/users"


export default async function addFav (id:string,jwt:string){
  const token = jwt.slice(1,-1)  
    
        const config = {
            method: "POST",
      baseURL: `${ENDPOINT}/favorite`,
      headers:{token:token},
      data: {
        gif:{id:id},
      },
    };
    return await axios(config)
      .then(res=>{
        const {data} = res
        return data
      })
      .catch((error)=>console.log(error))
}