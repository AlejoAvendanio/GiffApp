import axios from "axios";

const ENDPOINT = "http://localhost:3002/users"


export default async function register (input:any){
    const {email,name,password} = input
        const config = {
            method: "POST",
      baseURL: `${ENDPOINT}/register`,
      data: {
        email,
        name,
        password
      },
    };
    return await axios(config)
      .then(res=>{
        console.log(res.status)
        if(res.status!==200) throw new Error("Response is NOT ok")
        return true
      })
    }
 