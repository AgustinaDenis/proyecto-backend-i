import { Router } from "express";
import { showAllProducts, showOneProduct, adminPanelView, createProduct, updateProduct, adminDelete } from "../../controllers/products.controller.js";

const productsViewRouter = Router()

productsViewRouter.get("/", showAllProducts)
productsViewRouter.get("/admin", adminPanelView);
productsViewRouter.post("/admin/create", createProduct);
productsViewRouter.post("/admin/update/:pid", updateProduct);
productsViewRouter.post("/admin/delete/:pid", adminDelete);
productsViewRouter.get("/:pid", showOneProduct)


export default productsViewRouter