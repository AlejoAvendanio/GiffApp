import "dotenv/config"
import { Request, Response } from "express";
const userSchema = require("../models/user")
import jwt from 'jsonwebtoken';
import { Iuser } from "../models/user";

export const postRegister = async (req: Request, res:Response)=>{
    const {name, email, image, password, favorites} = req.body
    const users =await userSchema.findOne({email})
    const user: Iuser = await new userSchema();
    try{
        console.log(users)
        if(users){
            res.status(200).send("email en uso")
        }else{
            user.name = name
            user.email= email
            user.password = password
            user.image = image 
            user.favorites = favorites
            user.password = await user.encryptPassword(password)
            await user.save()
            res.status(200).send("user create")
        }
    }catch(e){
        res.status(400).send(e);
    }
}


export const addFavorite= async (req: Request, res:Response)=>{
    const { email } = req.body
    const {gif} =req.body
    try{
        const user = await userSchema.findOne({email})
        if(!user.favorites.some((e:any)=>e.id===gif.id)){
            user.favorites.push(gif)
        }else{
            user.favorites= user.favorites.filter(((e:any)=>e.id!==gif.id))
        }
        user.save()
        res.status(200).send(user.favorites)
    }catch(e){
        res.status(200).send(e)
    }
}


export const getUsers =async (_req: Request, res:Response)=>{
    const users = await userSchema.find({})
    res.status(200).send(users)
}

export const postLogin = async (req: Request, res:Response)=>{
    console.log(req.body)
    const {email, password } = req.body
    const user = await userSchema.findOne({email})
    if(!user) return res.status(401).send("invalid user or password")
    const { name, _id } = user
    try{
        const passwordCorrect = user === null
                ? false
                : await user.validatePassword(password)
                if(!(user && passwordCorrect)){
                    res.status(401).json({
                        error:"invalid user or password"
                    })
                }else{
                    const userForToken = {
                        _id,
                        name,
                        email
                    }
                    const token:string = jwt.sign(userForToken, process.env.SECRET || "tokentest")
                    res.header("token", token).json({
                        name,
                        email,
                        token
                    })
                }
    }catch(e){
        res.status(400).send(e)
    }
    
}
