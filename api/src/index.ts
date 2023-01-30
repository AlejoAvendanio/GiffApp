import * as dotenv from "dotenv";
dotenv.config();
import express from "express"
import users from "./routes/users.routes"
import chat from "./routes/chat.routes"
import messages from "./routes/messages.routes"
import "./database";
import http from "http";
import cors from "cors"





const PORT = process.env.PORT || 3001



const app = express()
const server = http.createServer(app);
const httpServer=server.listen(PORT)
const io = require("socket.io")(httpServer,{
	pingTimeout:60000,
	cors:{
		origin:"http://localhost:3000"
	}
})
io.on("connection",(socket)=>{
	console.log("connected to socket")
	
	
	socket.on("setup",(data)=>{
		socket.join(data)
		console.log(data)
		socket.emit("conected")
	})


	socket.on("join chat",(room:string)=>{
		socket.join(room)
		console.log(`User Joined Room: ${room}`)
	})


	socket.on("new message",(newMessageRecived)=>{
		let chat = newMessageRecived.chat
		if(!chat.users) return console.log("chat.users not defined")
		
		chat.users.forEach(user => {
			console.log("user id",user._id)
			console.log("sander id", newMessageRecived.sander._id)
			console.log(user._id == newMessageRecived.sander._id)
			if(user._id == newMessageRecived.sander._id) return
			socket.to(chat._id).emit("message recived",newMessageRecived)
		});
	})


	socket.on("typing",(room:string)=>socket.in(room).emit("typing"))
	socket.on("stop typing",(room:string)=>socket.in(room).emit("stop typing"))
	

	socket.off("setup",(data)=>{
		console.log("disconect")
		socket.leave(data)
	})
})

app.use(express.json())
app.use(cors());
app.use("/users",users)
app.use("/chat",chat)
app.use("/messages",messages)




console.log("server port "+ PORT)


