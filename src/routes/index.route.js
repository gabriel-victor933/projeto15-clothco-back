import { Router } from "express";
import login from "./login.route.js";

const router = Router();

router.use(login);

export default router;
