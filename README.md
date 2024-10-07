# Ecommerce 

#### `Dev - Agustina Denis y Ezequiel Bonadeo.`

# Pre-entrega 1.

## Descripción

<div>
<p>
Este proyecto proporciona una API REST que permite gestionar productos y usuarios, almacenando los datos en memoria y archivos. Todo fue probado y modificado utilizando la aplicación de Postman.
</p>
</div>

### Gestión de Productos y Usuarios

Con el método POST creamos un nuevo producto o usuario, le realizamos su validación, y si es exitosa, lo guardamos y devolvemos su nuevo id.

El método GET lo utilizamos tanto para leer todos los productos o usuarios como para traer uno en específico con su ID.

Para modificar y actualizar propiedades de usuarios o productos, utilizamos el método PUT, con las siguientes rutas:

/api/products/:pid

/api/users/:uid

Si todo es correcto, me devuelve el objecto modificado.

Con DELETE, eliminamos un objeto mediante el uso de su id. Si es exitoso, me devuelve el producto o usurio eliminado.

### Manejo de Errores

Se implementan middleware para manejar errores, rutas no encontradas y validaciones. De este modo, se proporciona una respuesta clara para cada tipo de error.


# Pre-entrega 2.

## Descripción

Para esta entrega, realizamos las vistas de nuestro proyecto, donde cada una nos mostrará la información solicitada.

## Vistas

El navbar proporcionará las distintas secciones para acceder a nuestras vistas.

En la ruta localhost:8000, podemos ver la página de inicio de nuestro e-commerce, que todavía se encuentra en proceso.

En la ruta localhost:8000/products, se muestran tarjetas (cards) que contienen todos nuestros productos, cada uno con su respectivo nombre (name) y precio (price). Al hacer clic en el botón "See product", nos lleva a la ruta localhost:8000/pid, donde se verán los detalles del producto seleccionado.

La ruta localhost:8000/users/register nos mostrará un formulario de registro para que el usuario introduzca los datos requeridos y se cree una cuenta. Estos datos se cargarán en nuestro archivo JSON. 

Al acceder a la vista en localhost:8000/users/login, ingresaremos nuestro correo electrónico (email) y contraseña (password). Cuando accedamos a nuestra cuenta, seremos dirigidos a la ruta localhost:8000/users/uid, donde se mostrarán los datos del usuario correspondiente a la cuenta ingresada.

Por último, en localhost:8000/products/admin se mostrará la vista del administrador. Allí podremos crear un producto proporcionando los datos requeridos. Además, en el apartado de Productos Existentes, podremos actualizar la información de nuestros productos o eliminar un producto.

El registro se realizó con Socket, mientras que las demás vistas fueron implementadas con JavaScript.










