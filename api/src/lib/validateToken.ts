import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
    _id:string,
    iat:number,
    email:string,
    name:string
}



export const tokenValidation = (req:Request, res:Response, next:NextFunction)=>{
    const token = req.header("token")
    if(!token) return res.status(401).json("Access denied")
    const payload = jwt.verify(token,process.env.SECRET || "tokentest") as IPayload
    req.user = {
        email : payload.email,
        name: payload.name,
        _id: payload._id 
    }
    next()
}