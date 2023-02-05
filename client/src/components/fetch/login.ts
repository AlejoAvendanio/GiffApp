import axios from "axios";

import { ENDPOINT } from "./addFavorite";


export type user = {
  email:string,
  password:string
}
export default async function login (input:user){
        const config = {
            method: "POST",
      baseURL: `${ENDPOINT}/users/login`,
      data: {
        email: input.email,
        password:input.password
      },
    };
    console.log("hola")
    return await axios(config)
      .then(res=>{
        const {data} = res
        window.localStorage.setItem("name",data.name)
        return data.token
      })
      .catch((error)=>console.log(error))
}
 