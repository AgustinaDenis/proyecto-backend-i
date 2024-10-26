import { Schema, Types, model, } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2"

const collection = "carts"
const schema = new Schema({
    //de esta forma le indico que el tipo de dato es objectId
    user_id: { type: Types.ObjectId, ref: "users", required: true},
    product_id: { type: Types.ObjectId, ref: "products", required: true}, 
    quantity: { type: Number, required: true},
    state: { type: String, default: "reserved", enum: ["reserved", "paid", "delivered"]}
})

//middleware PRE

schema.pre(
    "find",
    function (){
        this.populate("user_id", "email -_id")
        this.populate("product_id", "title img category price")
    }
)

schema.pre(
    "findOne",
    function (){
        this.populate("user_id", "email -_id")
        this.populate("product_id", "title img category price")
    }
)

schema.pre(
    "findOneAndUpdate",
    function (){
        this.populate("user_id", "email -_id")
        this.populate("product_id", "title img category price")
    }
)

schema.pre(
    "findOneAndDelete",
    function (){
        this.populate("user_id", "email -_id")
        this.populate("product_id", "title img category price")
    }
)


schema.plugin(mongoosePaginator)//le indico al schema que tiene habilitado el método paginate() para paginar los documentos de la colección
const Cart = model(collection, schema)
export default Cart