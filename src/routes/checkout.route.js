import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import {postOrder, getOrder,getOneOrder} from "../controllers/checkout.controller.js"

const router = Router()

router.get("/checkout",auth,getOrder)
router.get("/checkout/:id",auth,getOneOrder)
router.post("/checkout",auth,postOrder)

export default router