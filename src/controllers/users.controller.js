import usersManager from "../data/users.manager.js";

//crear
async function createUser(req, res, next) {
  try {
    const data = req.body;
    const responseManager = await usersManager.createUser(data);
    return res.status(201).json({ message: "USER CREATED", responseManager });
  } catch (error) {
    return next(error);
  }
}

//leer todo
async function readAllUsers(req, res, next) {
  try {
    const response = await usersManager.readAllUsers();
    if (response.length > 0) {
      return res
        .status(200)
        .json({ message: "ALL OUR USERS", users: response });
    } else {
      const error = new Error("ERROR 404, USERS NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    
    next(error);
  }
}

//leer por id
async function readUserId(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await usersManager.readUserId(uid);
    if (response) {
      return res.status(200).json({ message: "USER READ", response });
    } else {
      const error = new Error("ERROR 404, USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    
    next(error);
  }
}

//actualizar usuario
async function updateUser(req, res, next) {
  try {
    const { uid } = req.params; // Obtener el ID del usuario
    const updateData = req.body; // Obtener los datos de actualización del cuerpo de la solicitud
    const response = await usersManager.updateUser(uid, updateData); // Llamar al método update de productsManager
    if (response) {
      return res.status(200).json({ message: "USER UPDATED", response });
    } else {
      const error = new Error("ERROR 404, USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    
    next(error);
  }
}

//borrar usuario
async function deleteUser(req, res, next) {
  try {
    const { uid } = req.params; // Obtener el ID del usuario
    const response = await usersManager.deleteUser(uid); // Llamar al método delete de usersManager
    if (response) {
      return res.status(200).json({ message: "USER DELETED", response });
    } else {
      const error = new Error("ERROR 404, USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    
    next(error);
  }
}

//formulario de registro
async function registerView (req,res,next){
  try {
    const user = await usersManager.readUserId()
      return res.render("register", {user})
  } catch (error) {
      return next (error)
  }
}

// Vista de inicio de sesión
async function loginView(req, res, next) {
  try {
    return res.render("login", { error: null }); // Renderiza la vista de login
  } catch (error) {
    return next(error);
  }
}

// Manejo de inicio de sesión
async function handleLogin(req, res, next) {
  console.log(req.body)//muestra los datos que llegan en la solicitud
  try {
    const { emailLogin, passwordLogin } = req.body;
    //busca el usuario por email
    const user = await usersManager.readUserByEmail(emailLogin); 

    //verifica si el usuario existe y si la contraseña es correcta
    if (user && user.password === passwordLogin) { 
      return res.status(200).json({ status: "success", uid: user.id });
    } else {
      return res.status(404).json({ status: "error", message: "User not found or invalid credentials" });
    }
  } catch (error) {
    console.error(error)
    return next(error);
  }
}

//para mostrar el perfil del usuario
async function userProfileView(req, res, next) {
  try {
      const { uid } = req.params; // Obtiene el ID del usuario
      const response = await usersManager.readUserId(uid);
     
      if (response) {
          return res.render("profile", { profile : response }); // Renderiza la vista del perfil de usuario
      } else {
          return res.status(404).json({ message: "User not found" });
      }
  } catch (error) {
      return next(error);
  }
}






export { createUser, readAllUsers, readUserId, updateUser, deleteUser, registerView, loginView, handleLogin, userProfileView };
