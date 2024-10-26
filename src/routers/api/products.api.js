import { Router } from "express";
import { getAllProducts, createGet, getProduct, update, deleteProduct, create, createMongo, readAllMongo, paginate, readMongo, deleteMongo, updateMongo} from "../../controllers/products.controller.js";
import validData from "../../middlewares/validData.mid.js";

const productsRouter = Router()

//rutas
// productsRouter.get("/", getAllProducts)
// productsRouter.get("/:title/:category/:price", createGet)
// productsRouter.get("/:pid", getProduct)
// productsRouter.put("/:pid", update); // Ruta para actualizar
// productsRouter.delete("/:pid", deleteProduct); // Ruta para eliminar
// productsRouter.post("/", validData, create)// Ruta par crear un producto


productsRouter.post("/", validData, createMongo);
productsRouter.get("/", readAllMongo);
productsRouter.get("/paginate", paginate);
productsRouter.get("/:id", readMongo);
productsRouter.put("/:id", updateMongo);
productsRouter.delete("/:id", deleteMongo);


export default productsRouter