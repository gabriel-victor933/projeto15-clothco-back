import { Router } from "express";
import login from "./login.route.js";
import products from "./products.route.js";
const router = Router();
router.use(products);
router.use(login);

export default router;
