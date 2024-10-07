import { Router } from "express";
import { handleLogin, loginView, registerView, userProfileView} from "../../controllers/users.controller.js";



const usersViewRouter = Router()

//definimos la ruta de vistas para el formulario de register.
usersViewRouter.get("/register", registerView)
//definimos la ruta de vistas para el formulario de login.
usersViewRouter.get("/login", loginView)
//definimos la ruta para manejar el inicio de sesión
usersViewRouter.post("/login", handleLogin)
//definimos la ruta de vistas para ver el perfil del usuario
usersViewRouter.get("/:uid", userProfileView)


export default usersViewRouter