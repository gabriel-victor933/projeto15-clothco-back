import { Router } from "express";
import { getProducts } from "../controllers/products.controller.js";

const products = Router();
products.get("/", getProducts);

export default products;
