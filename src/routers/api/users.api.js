import { Router } from "express";
import { createUser, deleteUser, readAllUsers, readUserId, updateUser, createMongo, readAllMongo, readMongo, updateMongo, deleteMongo} from "../../controllers/users.controller.js";
import validDataUsers from "../../middlewares/validDataUsers.mid.js";


const usersRouter = Router()

// //aca van mis rutas de users
// usersRouter.get("/", readAllUsers)
// usersRouter.get("/:uid", readUserId)
// usersRouter.put("/:uid", updateUser); // Ruta para actualizar
// usersRouter.delete("/:uid", deleteUser); // Ruta para eliminar
// usersRouter.post("/", createUser)// Ruta para crear 

usersRouter.post("/", validDataUsers, createMongo);
usersRouter.get("/", readAllMongo);
usersRouter.get("/:id", readMongo);
usersRouter.put("/:id", updateMongo);
usersRouter.delete("/:id", deleteMongo);



export default usersRouter