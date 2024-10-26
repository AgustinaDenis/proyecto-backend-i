import { Schema, model } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2"


//mi coleccion de productos
const collection = "products"
//la forma que tiene el documento, qué propiedades y tipos tiene. La estructura de los productos
const schema = new Schema({
    title: { type: String, required: true, index: true},
    img: { type: String, required: true},
    category: { type: String, required: true, index: true},
    price: { type: Number, required: true},
    stock: { type: Number, required: true},
})

schema.plugin(mongoosePaginator)//le indico al schema que tiene habilitado el método paginate para paginar los documentos de la colección
const Product = model(collection, schema);
export default Product;