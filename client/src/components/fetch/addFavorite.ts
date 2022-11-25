import axios from "axios";

const ENDPOINT = "http://localhost:3002/users"


export default async function addFav (email:string,id:string,jwt:string){
    console.log(id,jwt, email)
        const config = {
            method: "POST",
      baseURL: `${ENDPOINT}/favorite`,
      header:{"token":jwt},
      data: {
        gif:{"id":id},
        email
      },
    };
    console.log(config.data)
    return await axios(config)
      .then(res=>{
        const {data} = res
        return data
      })
      .catch((error)=>console.log(error))
}