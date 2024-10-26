import { Router } from "express";
import { showAllProducts, showOneProduct, adminPanelView, createProduct, updateProduct, adminDelete } from "../../controllers/products.controller.js";

const productsViewRouter = Router()

productsViewRouter.get("/", showAllProducts)
productsViewRouter.get("/admin", adminPanelView);
productsViewRouter.post("/admin/create", createProduct);
productsViewRouter.post("/admin/update/:id", updateProduct);
productsViewRouter.post("/admin/delete/:id", adminDelete);
productsViewRouter.get("/:id", showOneProduct)


export default productsViewRouter