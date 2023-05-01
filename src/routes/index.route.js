import { Router } from "express";
import login from "./login.route.js";
import products from "./products.route.js";
import cart from "./cart.route.js"
import checkout from "./checkout.route.js"
const router = Router();
router.use(products);
router.use(login);
router.use(cart)
router.use(checkout)


export default router;
