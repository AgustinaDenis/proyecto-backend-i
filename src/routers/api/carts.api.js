import { Router } from "express";
import { createMongo, readAllMongo, readMongo, updateMongo, deleteMongo, calculateTotalCart} from "../../controllers/carts.controller.js";
import validDataCarts from "../../middlewares/validDataCarts.mid.js";


const cartsRouter = Router()

cartsRouter.post("/", validDataCarts, createMongo)
cartsRouter.get("/", readAllMongo)
cartsRouter.get("/:id", readMongo)
cartsRouter.put("/:id", updateMongo)
cartsRouter.delete("/:id", deleteMongo)
cartsRouter.get("/total/:user_id", calculateTotalCart)


export default cartsRouter