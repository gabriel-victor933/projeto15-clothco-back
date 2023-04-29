import { Router } from "express";
import {getCartItem, postCartItem} from "../controllers/cart.controller.js"
import auth from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/cart",auth,getCartItem)
router.post("/cart",auth,postCartItem)

export default router