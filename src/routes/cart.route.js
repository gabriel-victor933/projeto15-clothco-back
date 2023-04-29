import { Router } from "express";
import {getCartItem, postCartItem} from "../controllers/cart.controller.js"

const router = Router()

router.get("/cart",getCartItem)
router.post("/cart",postCartItem)

export default router