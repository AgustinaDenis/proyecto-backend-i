import cartsMongoManager from "../data/mongo/managers/cart.mongo.js";
import Controller from "./controller.js";
import mongoose, { Types } from "mongoose";

const cartsController = new Controller(cartsMongoManager, "CART");
const {
  createMongo,
  readAllMongo,
  paginate,
  readMongo,
  updateMongo,
  deleteMongo,
  calculateTotalCart,
} = cartsController;

// Crear un nuevo carrito
 async function createCart (req, res, next) {
  console.log("Request body:", req.body)
    try {
      const { user_id, product_id, quantity } = req.body;
      if (!user_id || !product_id || quantity === undefined) {
        return res.status(400).json({ message: "user_id, product_id, and quantity are required" });
      }
      const newCart = await cartsMongoManager.createMongo({ user_id, product_id, quantity });
      res.status(201).json({ message: "Cart created", cart: newCart }).redirect("/carts");
    } catch (error) {
      next(error);
    }
  };

// Obtener productos del carrito de un usuario
  async function getCartProducts (req, res, next) {
    try {
      const { id } = req.params;
      const cartProducts = await cartsMongoManager.readAllMongo({ user_id: id });
          if (!cartProducts || cartProducts.length === 0) {
            return res.status(404).json({ message: "No products found in cart" });
        }
          res.status(200).render("carts", { cartProducts } );
        } catch (error) {
          next(error);
        }
      };


export {
  createMongo,
  readAllMongo,
  paginate,
  readMongo,
  updateMongo,
  deleteMongo,
  calculateTotalCart,
  createCart,
  getCartProducts,
};
