import productsManager from "../data/products.manager.js";

async function getAllProducts(req, res, next) {
  try {
    let { category } = req.query;
    let response;
    if (!category) {
      response = await productsManager.readAll();
    } else {
      response = await productsManager.readAll(category);
    }

    if (response.length > 0) {
      return res
        .status(200)
        .json({ message: "ALL OUR PRODUCTS", products: response });
    } else {
      const error = new Error("ERROR 404, CATEGORY NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function createGet(req, res, next) {
  try {
    const { title, category, price } = req.params;
    let { stock } = req.query;
    if (!stock) {
      stock = 0;
    }
    const response = await productsManager.create({
      title,
      category,
      price,
      stock,
    });
    return res.status(201).json({ message: "PRODUCT CREATED", response });
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productsManager.readId(pid);
    if (response) {
      return res.status(200).json({ message: "PRODUCT READ", response });
    } else {
      const error = new Error("ERROR 404, PRODUCT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { pid } = req.params; // Obtener el ID del producto
    const updateData = req.body; // Obtener los datos de actualización del cuerpo de la solicitud
    const response = await productsManager.update(pid, updateData); // Llamar al método update de productsManager
    if (response) {
      return res.status(200).json({ message: "PRODUCT UPDATED", response });
    } else {
      const error = new Error("ERROR 404, PRODUCT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { pid } = req.params; // Obtener el ID del producto
    const response = await productsManager.delete(pid); // Llamar al método delete de productsManager
    if (response) {
      return res.status(200).json({ message: "PRODUCT DELETED", response });
    } else {
      const error = new Error("ERROR 404, PRODUCT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const responseManager = await productsManager.create(data);
    return res
      .status(201)
      .json({ message: "PRODUCT CREATED", responseManager });
  } catch (error) {
    return next(error);
  }
}

//vistas

async function showAllProducts(req, res, next) {
  try {
    let { category } = req.query;  // Capturamos el parámetro de categoría de la query string
    let response;

    if (!category) {
      response = await productsManager.readAll();  // Si no hay categoría, devolvemos todos los productos
    } else {
      response = await productsManager.readAll(category);  // Si hay categoría, devolvemos los productos filtrados
    }

    if (response.length > 0) {
      return res.render("products", { allProducts: response });  // Renderizamos los productos en la vista
    } else {
      const error = new Error("ERROR 404, CATEGORY NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function showOneProduct(req, res, next) {
  try {
    const { pid } = req.params;
    const response = await productsManager.readId(pid);
    if (response) {
      return res.render("oneProduct", { oneProduct: response });
    } else {
      const error = new Error("ERROR 404, PRODUCT NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
}

// Renderiza el panel de administración
async function adminPanelView(req, res, next) {
  try {
    console.log("Llamando a adminPanelView");
    const products = await productsManager.readAll(); // Obtener todos los productos
    res.render("admin", { products }); // Renderiza la vista del panel de administración
  } catch (error) {
    console.log(adminPanelView);
    return next(error);
  }
}

// Crear producto
async function createProduct(req, res, next) {
  try {
    const newProduct = {
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      img: req.body.img, 
    };

    await productsManager.create(newProduct); // Crear un nuevo producto
    res.redirect("/products/admin"); // Redirige al admin
  } catch (error) {
    return next(error);
  }
}

// Actualizar producto
async function updateProduct(req, res, next) {
  try {
    const { pid } = req.params; // Obtener el ID del producto
    const updatedData = req.body; // Obtener los datos actualizados
    await productsManager.update(pid, updatedData); // Actualizar el producto
    res.redirect("/products/admin"); // Redirige al panel de administración
  } catch (error) {
    return next(error);
  }
}

// Eliminar producto
async function adminDelete(req, res, next) {
  try {
    const { pid } = req.params; // Obtener el ID del producto
    await productsManager.delete(pid); // Eliminar el producto
    res.redirect("/products/admin"); // Redirige al panel de administración
  } catch (error) {
    return next(error);
  }
}

export { getAllProducts,createGet,getProduct,update,deleteProduct,create,showAllProducts,showOneProduct,adminPanelView,createProduct,updateProduct,adminDelete,};
