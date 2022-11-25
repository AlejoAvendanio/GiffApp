import * as dotenv from "dotenv";
dotenv.config();
import express from "express"
import users from "./routes/users.routes"
import "./database";
import http from "http";
const app = express()
const cors = require("cors");
const PORT = process.env.PORT || 3001

const server = http.createServer(app);
app.use(express.json())
app.use(cors());

server.listen(PORT,()=>{
    console.log("server port "+ PORT)
})
app.use("/users",users)