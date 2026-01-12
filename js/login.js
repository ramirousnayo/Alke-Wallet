$(document).ready(function() {

  $('#loginForm').submit(function(e) {
    e.preventDefault();

    const email = $('#email').val().trim();
    const password = $('#password').val().trim();
    const alertContainer = $('#alert-container');

    alertContainer.html(''); // Limpiar alertas previas

    // Validación de campos vacíos
    if (!email || !password) {
      alertContainer.html(`
        <div class="alert alert-danger" role="alert">
          Por favor, completa todos los campos.
        </div>
      `);
      return;
    }

    // Validar credenciales
    if (email === "admin@wallet.com" && password === "1234") {

      // Mostrar mensaje de éxito
      alertContainer.html(`
        <div class="alert alert-success" role="alert">
          ¡Login exitoso! Redirigiendo al menú...
        </div>
      `);

      // Guardar usuario en localStorage
      localStorage.setItem('usuario', email);

      // Redirigir al menú
      setTimeout(() => {
        window.location.href = "menu.html";
      }, 1500);

    } else {
      // Mensaje de error
      alertContainer.html(`
        <div class="alert alert-danger" role="alert">
          Credenciales incorrectas
        </div>
      `);
    }

  });

});
