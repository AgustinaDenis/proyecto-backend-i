import { Types } from "mongoose";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  createMongo = async (data) => {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  readAllMongo = async (filter) => {
    try {
      const response = await this.model.find(filter, "-_v").lean();
      return response;
    } catch (error) {
      throw error;
    }
  };
  paginate = async (filter, opts) => {
    try {
      opts.lean = true;
      const all = await this.model.paginate(filter, opts);
      return all;
    } catch (error) {
      throw error;
    }
  };
  readMongo = async (id) => {
    try {
      const one = await this.model.findOne({ _id: id });
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateMongo = async (id, data) => {
    try {
      const opts = { new: true };
      const one = await this.model.findOneAndUpdate({ _id: id }, data, opts);
      return one;
    } catch (error) {
      throw error;
    }
  };
  deleteMongo = async (id) => {
    try {
      const one = await this.model.findOneAndDelete({ _id: id });
      return one;
    } catch (error) {
      throw error;
    }
  };
  showProduct = async (id) => {
    try {
      const product = await Product.findById(id);
      if (product) {
        return {
          ...product.toObject(),
          _id: product._id.toString(),
        };
        return null;
      }
    } catch (error) {
      throw error;
    }
  };
  calculateTotalCart = async (id) => {
    try {
      //metodo aggregate
      const total = await this.model.aggregate([
        // stage $match
        { $match: { user_id: new Types.ObjectId(id) } },
        // $lookup para popular los productos
        {
          $lookup: {
            foreignField: "_id",
            from: "products",
            localField: "product_id",
            as: "product_id",
          },
        },
        // $replaceRoot para mergear el objeto con el objeto  cero del array populado
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },
        // $set calcular el subtotal multiplicando quantiity*price
        { $set: { subTotal: { $multiply: ["$quantity", "$price"] } } },
        // hacemos un reduce con el opreador $group
        { $group: { _id: "$user_id", total: { $sum: "$subTotal" } } },
        // $project limpiar ell objecto, me deja solo el user_id, total y date.
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
          },
        },
        //populo el user_id con un $lookup
        {
          $lookup: {
            foreignField: "_id",
            from: "users",
            localField: "user_id",
            as: "user_id",
          },
        },
        //cambio de raiz con un $replaceRoot
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$user_id", 0] }, "$$ROOT"],
            },
          },
        },
        // $project para dejar solo el email, total y date
        {
          $project: {
            _id: 0,
            user_id: 0,
            password: 0,
            rol: 0,
            __v: 0,
            isOnline: 0,
          },
        },
      ]);
      return total;
    } catch (error) {
      throw error;
    }
  };
  readUserByEmail = async (email) => {
    try {
      return await User.findOne({ email }); // Busca directamente en la base de datos
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  readUserById = async (id) => {
    try {
      // Busca directamente en la base de datos usando el ID
      const user = await User.findById(id);
      console.log(user);
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  };
}

export default MongoManager;
