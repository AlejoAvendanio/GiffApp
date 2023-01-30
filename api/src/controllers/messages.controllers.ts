import { Request, Response } from "express"
const messagesSchema = require("../models/messages")
const chatSchema = require("../models/chat")
const userSchema = require("../models/user")




export const postMessage = async (req: Request, res:Response)=>{
    const {id,content} = req.body
    const {_id} = req.user
    var newMessage = {
        sander: _id,
        content,
        chat:id
    }
    try{
        let message = await new messagesSchema(newMessage)
        message = await message.populate("sander", "name email")
        message = await message.populate("chat")
        message = await userSchema.populate(message,{
            path:"chat.users",
            select:"name email"
        }) 

        await chatSchema.findByIdAndUpdate(id,{
            latesMessages:message
        })
        await message.save()
        res.status(200).json(message)
    }catch(e){
        res.status(400).send(e);
    }
}

export const allMessages = async (req:Request,res:Response)=>{
    const {chatID} = req.body
    try{
        let messages = await messagesSchema.find({chat:chatID}).populate(
            "sander",
            "name email"
        ).populate("chat")
        res.json(messages)
    }catch(e){
        res.status(400).send(e);
    }
}