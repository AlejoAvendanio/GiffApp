import { Router } from "express"
import { createChat, getAllChatsUser, getChatById } from "../controllers/chat.controller"
import { tokenValidation } from "../lib/validateToken"

const router = Router()

router
.post("/",tokenValidation,createChat)
.get("/",tokenValidation,getAllChatsUser)
.post("/chatById",tokenValidation,getChatById)
export default router