import { Router } from "express";
import data from "../middlewares/data.middleware.js";

import { postRegister, postLogin } from "../controllers/sign.controller.js";
import loginSchema from "../schemas/login.schema.js";
import registerSchema from "../schemas/register.schema.js";

const login = Router();

login.post("/login", data(loginSchema), postLogin);
login.post("/register", data(registerSchema), postRegister);

export default login;
