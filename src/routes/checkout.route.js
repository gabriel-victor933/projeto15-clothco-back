import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import {postOrder, getOrder} from "../controllers/checkout.controller.js"

const router = Router()

router.get("/checkout",auth,getOrder)
router.post("/checkout",auth,postOrder)

export default router