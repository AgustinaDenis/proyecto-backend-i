import Product from "../models/product.model.js";
import MongoManager from "./manager.mongo.js";

// class ProductsMongoManager {
//     async createMongo(data){
//         try {
//             const one = await Product.create(data)
//             return one
//         } catch (error) {
//          throw error  
//         }
//     }

//    async readAllMongo(){
//         try {
//            const all = await Product.find() 
//            return all
//         } catch (error) {
//          throw error  
//         }
//     }

//    async readMongo(pid){
//         try {
//          const one = await Product.findById(pid)  
//          return one 
//         } catch (error) {
//          throw error 
//         }
//     }

//   async updateMongo(pid, data){
//         try {
//             const one = await Product.findByIdAndUpdate(pid, data, opts)//me devuelve el objeto después de la modificación
//             return one
//         } catch (error) {
//          throw error  
//         }
//     }

//   async deleteMongo(pid){
//         try {
//            const one = await Product.findByIdAndDelete(pid)
//            return one
//         } catch (error) {
//          throw error  
//         }
//     }
  
// }

// const productsMongoManager = new ProductsMongoManager();
// export default productsMongoManager;

const productsMongoManager = new MongoManager(Product)
export default productsMongoManager