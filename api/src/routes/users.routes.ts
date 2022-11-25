import { Router } from "express"
import { addFavorite, getUsers, postLogin, postRegister } from "../controllers/user.controllers"
import { tokenValidation } from "../lib/validateToken"
const router = Router()

router.post("/register",postRegister)
router.post("/login",postLogin)
router.get("/",getUsers)

router.post("/favorite",tokenValidation,addFavorite)

export default router