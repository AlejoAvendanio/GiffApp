import axios from "axios";

const ENDPOINT = "http://localhost:3002/users"


export default async function login (input:any){
        const config = {
            method: "POST",
      baseURL: `${ENDPOINT}/login`,
      data: {
        email: input.email,
        password:input.password
      },
    };
    return await axios(config)
      .then(res=>{
        const {data} = res
        return data
      })
      .catch((error)=>console.log(error))
}
 