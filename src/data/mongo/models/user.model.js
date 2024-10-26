import { Schema, model  } from "mongoose";
import mongoosePaginator from "mongoose-paginate-v2"

const collection = "users"
const schema = new Schema({
    name: { type: String, required: true, index: true},
    email: { type: String, required: true, unique: true, index: true},
    password: { type: String, required: true, index: true},
    photo: { type: String, default: "hola"},
    rol: { type: String, enum: ["user", "admin", "prem"], default:"user", index: true},
    isOnline: { type: Boolean, default: false},

})

schema.plugin(mongoosePaginator)//le indico al schema que tiene habilitado el método paginate para paginar los documentos de la colección 
const User = model(collection, schema)
export default User