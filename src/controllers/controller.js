import MongoManager from "../data/mongo/managers/manager.mongo.js";
import mongoose from "mongoose";
import { Types } from "mongoose";

class Controller {
  constructor(manager, model) {
    this.manager = manager;
    this.model = model;
  }
  createMongo = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.manager.createMongo(data);
      return res
        .status(201)
        .json({ message: this.model + " CREATED", response: response._id });
    } catch (error) {
      return next(error);
    }
  }

  readAllMongo = async (req, res, next) => {
    try {
      const filter = req.query
      const response = await this.manager.readAllMongo(filter);
      if (response.length > 0){
        return res
        .status(200)
        .json({ message: "ALL OUR " + this.model, response });
      }else{
        const error = new Error(this.model + " NOT FOUND")
        error.statusCode = 404
        throw error
      }     
    } catch (error) {
      console.log(error)
      return next(error);
    }
  }

  paginate = async (req, res, next) => {
    try {
      const { page, limit } = req.query
      const response = await this.manager.paginate({}, { page, limit });
      if (response.docs.length > 0){
        return res
        .status(200)
        .json({ message: "ALL OUR " + this.model, 
          response: response.docs,
          prevPage: response.prevPage, 
          nextPage: response.nextPage,
          hasPrevPage: response.hasPrevPage, 
          hasNextPage: response.hasNextPage  });
      }else{
        const error = new Error(this.model + " NOT FOUND")
        error.statusCode = 404
        throw error
      }     
    } catch (error) {
      return next(error);
    }
  }

  readMongo = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("ID recibido:", id);
      const response = await this.manager.readMongo(new mongoose.Types.ObjectId(id));
      if (response) {
        return res
        .status(200)
        .json({ message: " OUR" + this.model, response });
      } else {
        const error = new Error(this.model + " NOT FOUND")
        error.statusCode = 404
        throw error
      }     
    } catch (error) {
      console.error(error)
      return next(error);
    }
  }

  updateMongo = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      console.log("Updating product with ID:", id, "and data:", data);
      const response = await this.manager.updateMongo(id, data);
      if (response) {
        return res
        .status(200)
        .json({ message: this.model + " UPDATE", response });
      } else {
        const error = new Error(this.model + " NOT FOUND")
        error.statusCode = 404
        throw error
      }    
    } catch (error) {
      console.error("Update error:", error);
      return next(error);
    }
  }

  deleteMongo = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.manager.deleteMongo(id);
      if (response) {
        return res
        .status(200)
        .json({ message: this.model + " DELETED", response });
      } else {
        const error = new Error(this.model + " NOT FOUND")
        error.statusCode = 404
        throw error
      }  
    } catch (error) {
      console.error(error)
      return next(error);
    }
  }

  calculateTotalCart = async (req, res, next) => {
    try {
      const { user_id } = req.params
      const response = await this.manager.calculateTotalCart(user_id)
      return res
      .status(200)
      .json({ message: this.model + " TOTAL CART", response });
    } catch (error) {
      return next (error)
    }
  }

 
}



export default Controller;
