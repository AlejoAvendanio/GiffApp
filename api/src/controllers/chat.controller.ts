import { Request, Response } from "express";
const userSchema = require("../models/user")
const chatSchema = require("../models/chat")


export const createChat =async (req:Request, res:Response, next:any) => {
	const { id } = req.body;
	const {user} = req 
    const friend = await userSchema.findOne({_id:id})
	if (!friend) {
		const statusError = res.status(400).send('Chat requires a name and an image to be created');
		return next(statusError);
	}
	var newChat ={
		friend1:friend.name,
		friend2:user,
		isGroupChat:false,
		users:[id,user._id]
	}
	try {
		let chat = await new chatSchema(newChat);
		chat =await chat.populate("users","name email")
		await chat.save()
		await friend.chats.push(chat)
		await friend.save()
		const {email} = user
		const userCreatedChat = await userSchema.findOne({email})
		await userCreatedChat.chats.push(chat)
		await userCreatedChat.save()
		return res.status(201).json(userCreatedChat.chats);
	} catch (error) {
		const statusError = res.status(500).send(error);
		return next(statusError);
	}
};


export const getAllChatsUser = async (req:Request,res:Response)=>{
	const {_id} = req.user
	try{
		let allChats =await userSchema.findOne({_id})
		console.log(allChats)
		res.json(allChats.chats)
	}catch(e){
		res.status(400).send(e)
	}
}

export const getChatById = async (req:Request,res:Response)=>{
	const {id} = req.body
	try{
		let chats = await chatSchema.find({_id:id})
		chats = await chats[0].populate("users","name email")
		chats =await chats.populate("latesMessages")
		console.log(chats)
		res.send(chats)
	}catch(err){
		res.status(400)
	}
}