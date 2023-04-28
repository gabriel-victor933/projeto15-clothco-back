import { Router } from "express";
import { getProducts, getOneProduct } from "../controllers/products.controller.js";

const products = Router();
products.get("/", getProducts);
products.get("/product/:id", getOneProduct);


export default products;
