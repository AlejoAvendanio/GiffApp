import { Router } from "express"
import { allMessages, postMessage } from "../controllers/messages.controllers"
import { tokenValidation } from "../lib/validateToken"
const router = Router()

router.post("/",tokenValidation,postMessage).post("/allMessages",tokenValidation,allMessages)

export default router