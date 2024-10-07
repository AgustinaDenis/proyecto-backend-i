//con esto tengo configurado el socket del front
//maneja todas las emisiones y recepciones del front
const socket = io();

//crea un nuevo usuario y renderiza en tiempo real el usuario recien registrado a la base de datos
document.querySelector("#botonRegister").addEventListener("click", () => {
  //valores del formulario
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const repeatPassword = document.querySelector("#repeatPassword").value;
  const userData = { name, email, password, repeatPassword };
  //creo el nuevo usuario
  socket.emit("new user", userData);
});

socket.on("update user", (id) => {
  document.querySelector("#update").innerHTML = id;
});


