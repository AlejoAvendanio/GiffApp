import "dotenv/config"
import { Request, Response } from "express";
const userSchema = require("../models/user")
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongoose";
import { Iuser } from "../models/user";


interface User {
    id:ObjectId,
    name:string,
    email:string,
    password:string,
    favorites:string[],
    __v:number
}

interface favorite {
    id:string
}


export const postRegister = async (req: Request, res:Response)=>{
    const {name, email, image, password, favorites} = req.body
    const users:User =await userSchema.findOne({email})
    const user: Iuser = await new userSchema();
    try{
        if(users){
            return res.status(400).send("email en uso")
        }else{
            if(!name){
                return res.status(401).send("name")
            }else if(!email){
                return res.status(402).send("email")
            }else if(!password){
                return res.status(403).send("password")
            }
            else if(name && email && password) {
            user.name = name
            user.email= email
            user.password = password
            user.image = image 
            user.favorites = favorites
            user.password = await user.encryptPassword(password)
            await user.save()
            res.status(200).send("user create")
        } else{
            throw new Error("faltan datos")
        }
        }
    }catch(e){
        res.status(400).send(e);
    }
}

export const getFavs = async (req: Request, res:Response)=>{
    const {user} = req
    const {email} = user
    try{
        const gifs = await userSchema.findOne({email})
        res.send(gifs.favorites)
    }catch(e){
        res.status(400).send(e)
    }
}


export const addFavorite= async (req: Request, res:Response)=>{
    const { user } = req
    const {gif} =req.body
    const {email} = user
    try{
        const user = await userSchema.findOne({email})
        if(!user.favorites.some((e:favorite)=>e.id===gif.id)){
            user.favorites.push(gif)
        }else{
            user.favorites= user.favorites.filter(((e:favorite)=>e.id!==gif.id))
        }
        user.save()
        res.status(200).send(user.favorites)
    }catch(e){
        res.status(200).send(e)
    }
}


export const getUsers =async (req: Request, res:Response)=>{
    const {name}:any = req.body ? 
    {
        name:{$regex:req.body.name}
    }:{}

    if(name){
        const users = await userSchema.find({name}).find({_id:{$ne:req.user._id}})
        const inf = users.map((e:User)=>{return{name:e.name,id:e.id}})
        res.status(200).send(inf)
    }else{
        const users = await userSchema.find({})
        const inf = users.map((e:User)=>{return{name:e.name,id:e.id}})
        res.status(200).send(inf)
    }
}

export const postLogin = async (req: Request, res:Response)=>{
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
