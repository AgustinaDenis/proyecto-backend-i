document.querySelector("#botonLogin").addEventListener("click", async (event) => {
    event.preventDefault(); 
  
    const emailLogin = document.querySelector("#emailLogin").value;
    const passwordLogin = document.querySelector("#passwordLogin").value;
  
    // Validación
    if (!emailLogin || !passwordLogin) {
        document.querySelector("#loginResponse").innerText = "Por favor, completa todos los campos.";
        return;
    }
  
    const userData = { emailLogin, passwordLogin };
  
    try {
      const response = await fetch("/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      const result = await response.json();
  
      if (result.status === "success") {
        window.location.href = `/users/${result.uid}`; // Redirección
      } else {
        document.querySelector("#loginResponse").innerText = result.message; // Mensaje de error
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      document.querySelector("#loginResponse").innerText = "Hubo un problema con la solicitud.";
    }
  });