//Acá voy a construir una funcion que me habilite la conexion de la base de datos de Mongo

import { connect } from "mongoose";

async function dbConnect(){
    try {
       await connect(process.env.DB_LINK)
       console.log("MongoDB connected")
    } catch (error) {
        console.log(error.message)
    }
}

export default dbConnect
