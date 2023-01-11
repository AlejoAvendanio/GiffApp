import * as dotenv from "dotenv";
dotenv.config();
import express from "express"
import users from "./routes/users.routes"
import "./database";
import http from "http";
import {Server as WebSocketServer} from "socket.io"


const app = express()
const cors = require("cors");


const PORT = process.env.PORT || 3001



const server = http.createServer(app);



const io = new WebSocketServer(server, {
    cors: {
        origin: "*",
    },
})



io.on("connection", (socket) => {
    // console.log(socket)
    socket.on("message", (data,{name}) => {
        console.log(data)
        socket.broadcast.emit("message", {
        body: data,
        from: name,
        });
    });
    socket.on("chat:typing",(data)=>{
        socket.broadcast.emit("chat:typing",data)
      })
});




app.use(express.json())
app.use(cors());

server.listen(PORT,()=>{
    console.log("server port "+ PORT)
})

app.use("/users",users)