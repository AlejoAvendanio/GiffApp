import axios from "axios";

import { ENDPOINT } from "./addFavorite";


type Register = {
  email:string,
  password:string,
  name:string
}
export default async function register (input:Register){
    const {email,name,password} = input
        const config = {
            method: "POST",
      baseURL: `${ENDPOINT}/users/register`,
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
 