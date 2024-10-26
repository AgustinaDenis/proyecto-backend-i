import { Router } from "express";
import { createCart, getCartProducts } from "../../controllers/carts.controller.js";

const cartsViewRouter = Router()

cartsViewRouter.post("/", createCart)
cartsViewRouter.get("/:id", getCartProducts);



export default cartsViewRouter